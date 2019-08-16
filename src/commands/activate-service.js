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
            script: 'C:\\%USERPROFILE%\\AppData\\Roaming\\npm\\node_modules\\mssqlbackup\\src\\lib\\start.js'
        });

        svc.on('install',function(){
            svc.start();
        });
        svc.install();
        
    }
}

activateService.description = `activates the windows service feature`

activateService.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = activateService
