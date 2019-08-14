const {Command, flags} = require('@oclif/command');

const fs = require('fs');
const path = require('path');

function getAllConfigs(callback){
  let ConfDir = "C:\\MSSQL-Backup\\configs"; //get directory which contains the files
    fs.readdir(ConfDir, (err, files) => {
        if(err) throw err;
        let confArr = [];
        let i = 0;
        files.forEach((file) => {
           confArr[i] = file;
           i++;
        });
        callback(confArr);
    });
}

class showConfigs extends Command {
  async run() {
    const {flags} = this.parse(showConfigs)
    getAllConfigs((res) =>{
      let responseCommand = "";
      for(let i=0;i<=res.length-1;i++){
        responseCommand+="- "+res[i]+"\n";
      }
      this.log(responseCommand)
    })
  }
}

showConfigs.description = `shows all config files installed`

showConfigs.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = showConfigs
