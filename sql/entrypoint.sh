#!/bin/bash
set -euo pipefail

/opt/mssql/bin/sqlservr &
sqlservr_pid=$!

attempt_counter=0
max_attempts=30
sleep_seconds=2

>&2 echo "Waiting for SQL Server to accept connections..."

until /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$MSSQL_SA_PASSWORD" -Q "SELECT 1" &>/dev/null
do
  if [ $attempt_counter -ge $max_attempts ]; then
    >&2 echo "SQL Server did not start within expected time."
    exit 1
  fi

  attempt_counter=$((attempt_counter+1))
  sleep $sleep_seconds
  >&2 echo "Retrying connection to SQL Server ($attempt_counter/$max_attempts)..."
done

>&2 echo "Executing initialization script..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$MSSQL_SA_PASSWORD" -i /usr/src/sql/init.sql

wait $sqlservr_pid
