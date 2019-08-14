mkdir C:\MSSQL-Backup
cd C:\MSSQL-Backup
mkdir logs
mkdir configs
mkdir MSSQL-Backup-Config
cd MSSQL-Bakup-Config
echo '{"smtp": {"server": "<your smtp server>","username": "<smtp username>","smt_pasword": "<your smtp password>"}}' > mail.json
code mail.json