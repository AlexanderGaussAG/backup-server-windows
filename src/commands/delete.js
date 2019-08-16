const {Command, flags} = require('@oclif/command');

const fs = require('fs');
const path = require('path');
const Service = require('node-windows').Service;
var os = require('os');
const { cli } = require('cli-ux');


class activateService extends Command {
  async run() {
        const {flags} = this.parse(activateService)
        let tdl = await cli.prompt("File To delete");
        let ending = "";
        if(tdl.search(".json") == -1){
            ending = ".json";
        }
        fs.unlink("C:\\MSSQL-Backup\\configs\\"+tdl+ending, (err) => {
            if(err){
                this.log(err);
            }
            else{
                this.log("file deleted");
            }
        })
        
    }
}

activateService.description = `activates the windows service feature`

activateService.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = activateService
