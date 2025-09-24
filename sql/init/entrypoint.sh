#!/bin/bash
set -euo pipefail

/opt/mssql/bin/sqlservr &
SQL_PID=$!

function cleanup() {
  if ps -p "${SQL_PID}" > /dev/null; then
    kill "${SQL_PID}"
  fi
}
trap cleanup EXIT

printf 'Waiting for SQL Server to be available'
for i in {1..60}; do
  if /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "${MSSQL_SA_PASSWORD}" -Q "SELECT 1" >/dev/null 2>&1; then
    echo ' - ready'
    break
  fi
  printf '.'
  sleep 2
  if [ "$i" -eq 60 ]; then
    echo ' SQL Server failed to start in time' >&2
    exit 1
  fi
done

/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "${MSSQL_SA_PASSWORD}" -d master -i /init/setup.sql

wait "${SQL_PID}"
