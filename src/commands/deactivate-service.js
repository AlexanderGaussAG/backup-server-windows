const {Command, flags} = require('@oclif/command');

const fs = require('fs');
const path = require('path');
const Service = require('node-windows').Service;

class activateService extends Command {
  async run() {
        const {flags} = this.parse(activateService)
        
        var svc = new Service({
            name:'mssql-backup',
            description: 'a simple service to backup mssql databases',
            script: 'C:\\MSSQL-Backup\\src\\lib\\start.js'
        });

        svc.on('uninstall',function(){
            console.log('Uninstall complete.');
            console.log('The service exists: ',svc.exists);
        });
        svc.uninstall();
    }
}

activateService.description = `deactivates the windows service feature`

activateService.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = activateService
