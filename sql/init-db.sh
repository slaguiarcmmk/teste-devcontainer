#!/bin/bash
set -euo pipefail

if [ -z "${DB_PASSWORD:-}" ]; then
  echo "Variável de ambiente DB_PASSWORD não definida." >&2
  exit 1
fi

DB_USER="${DB_USER:-sa}"
SERVER="${DB_HOST:-sqlserver}"
SCRIPT_PATH="${INIT_SCRIPT:-/sql/init.sql}"

until /opt/mssql-tools/bin/sqlcmd -S "$SERVER" -U "$DB_USER" -P "$DB_PASSWORD" -Q "SELECT 1" >/dev/null 2>&1; do
  echo "Aguardando SQL Server em $SERVER..."
  sleep 2
done

echo "Aplicando script $SCRIPT_PATH"
/opt/mssql-tools/bin/sqlcmd -S "$SERVER" -U "$DB_USER" -P "$DB_PASSWORD" -i "$SCRIPT_PATH"

echo "Script executado com sucesso."
