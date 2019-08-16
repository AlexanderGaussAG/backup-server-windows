const {Command, flags} = require('@oclif/command');

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;



class restart extends Command {
  async run() {
        const {flags} = this.parse(restart)
        exec('net.exe stop "mssql-backup"', (err, stdout, stderr) => {
            if(err){
                this.log(err);
            }
            else if(stderr){
                this.log(stderr);
            }
            else if(stdout){
                exec('net.exe start "mssql-backup"', (err, stdout, stderr) => {
                    if(err){
                        this.log(err);
                    }
                    else if(stderr){
                        this.log(stderr);
                    }
                    else if(stdout){
                        this.log("restarted successfully\n\n"+stdout);
                    }
                })
            }
        })
        
    
    }
}

restart.description = `restarts the windows service feature`

restart.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = restart
