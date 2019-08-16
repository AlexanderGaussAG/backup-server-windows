const {Command, flags} = require('@oclif/command');

const exec = require('child_process').exec;
const { cli } = require('cli-ux');

class edit extends Command {
    async run() {
        const {flags} = this.parse(edit)
        let fte = await cli.prompt("Which file do you want to edit?");
        let ending = "";
        if(fte.search(".json") == -1){
            ending = ".json";
        }
        fte+=ending;
        exec("notepad.exe C:\\MSSQL-Backup\\configs\\"+fte, (err, stdout, stderr) => {
            if(err){
                this.log(err);
            }
            else if(stdout){
                this.log(stdout);
            }
            else if(stderr){
                this.log(stderr);
            }
        })
    }
      
}

edit.description = `edits a conf file`

edit.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = edit
