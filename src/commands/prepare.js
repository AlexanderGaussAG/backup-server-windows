const {Command, flags} = require('@oclif/command');

const fs = require('fs');
const path = require('path');
const { base64encode, base64decode } = require('nodejs-base64');
var child_process = require('child_process');

class prepare extends Command {
    async run() {
        let oclif = this.log;
        const {flags} = this.parse(prepare)
        child_process.exec('cmd /c '+path.resolve(__dirname, "../lib/install.bat"), function(error, stdout, stderr) {
          if(stderr){
            let file = JSON.parse(fs.readFileSync("C:\\MSSQL-Backup\\MSSQL-Backup-Config\\mail.json"));
            file.smtp.auth.password = base64encode(file.smtp.auth.password);
            fs.writeFile("C:\\MSSQL-Backup\\MSSQL-Backup-Config\\mail.json", JSON.stringify(file), (err) => {
                if(err){
                    oclif(err);
                }
                else{
                    oclif(stderr);
                }
            })
          }
          else if(stdout){
            let file = JSON.parse(fs.readFileSync("C:\\MSSQL-Backup\\MSSQL-Backup-Config\\mail.json"));
            file.smtp.auth.password = base64encode(file.smtp.auth.password);
            fs.writeFile("C:\\MSSQL-Backup\\MSSQL-Backup-Config\\mail.json", JSON.stringify(file), (err) => {
                if(err){
                    oclif(err);
                }
                else{
                    oclif(stdout);
                }
            })
          }
          else if(error){
            let file = JSON.parse(fs.readFileSync("C:\\MSSQL-Backup\\MSSQL-Backup-Config\\mail.json"));
            file.smtp.auth.password = base64encode(file.smtp.auth.password);
            fs.writeFile("C:\\MSSQL-Backup\\MSSQL-Backup-Config\\mail.json", JSON.stringify(file), (err) => {
                if(err){
                    oclif(err);
                }
                else{
                    oclif(error);
                }
            })
          }
        });
    }
      
}

prepare.description = `prepares the server`

prepare.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = prepare
