const {Command, flags} = require('@oclif/command');

const fs = require('fs');
const path = require('path');
var child_process = require('child_process');

class prepare extends Command {
    async run() {
        let oclif = this.log;
        const {flags} = this.parse(prepare)
        child_process.exec(path.resolve(__dirname,'../../install.bat'), function(error, stdout, stderr) {
          if(stderr){
              oclif(stderr);
          }
          else if(stdout){
              oclif(stdout);
          }
          else if(error){
              oclif(error);
          }
        });
    }
      
}

prepare.description = `prepares the server`

prepare.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = prepare
