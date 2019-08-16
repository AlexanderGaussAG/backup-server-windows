mkdir C:\MSSQL-Backup
cd C:\MSSQL-Backup
mkdir logs
mkdir configs
mkdir MSSQL-Backup-Config
cd MSSQL-Bakup-Config
cd MSSQL-Backup-Config
echo {"smtp": {"host": "<your smtp server>","secure": true, "port": 465, "auth": {"user": "<username>", "password": "<password>"}}} > mail.json
notepad.exe mail.json