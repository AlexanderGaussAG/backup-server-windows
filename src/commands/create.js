const {Command, flags} = require('@oclif/command');

const fs = require('fs');
const path = require('path');

const { base64encode, base64decode } = require('nodejs-base64');

const yaml = require('js-yaml');

const { cli } = require('cli-ux');

class createConfig extends Command {
  async run() {
    const {flags} = this.parse(createConfig)

    function createJSONarray(arr){
        let otp = '[{'
        for(let i=0;i<=arr.length-1;i++){
            if(i == arr.length-1){
                otp+='{"path": "'+arr[i]+'"}';
            }
            else{
                otp+='{"path": "'+arr[i]+'"},';
            }
        }
        return JSON.parse(otp);
    }
    
    const name = await cli.prompt("File Name");
    const n = await cli.prompt("In how many directories do you want to store the backup?")
    let x = [];
    for(let i = 0; i<=n-1; i++){
        x[i] = await cli.prompt("Path");
    }
    x = createJSONarray(x);
    let dbuser = await cli.prompt("DB username");
    let dbpw = await cli.prompt("BD password");
    let dbsv = await cli.prompt("DB server");
    let dbdb = await cli.prompt("DB name");
    let emailtf = await cli.prompt("Do you want to recieve status emails? (y/n)");
    let email = "";
    if(emailtf == "y" || emailtf == "Y"){
        email = await cli.prompt("Email");
        emailtf = true;
    }
    else{
        emailtf = false;
        email = "test@testmail.net";
    }
    let crontime = await cli.prompt("CRON-Time");
    let ttl = await cli.prompt("TTL");
    
     let obj = {
         db : {
             user: dbuser,
             password: base64encode(dbpw),
             server: dbsv,
             database: dbdb
         },
         backupFolder: x,
         email: email,
         sendEmail: emailtf,
         cronTime: crontime,
         ttl: ttl
     }   
    
    fs.writeFile("C:\\MSSQL-Backup\\configs\\"+name+".json", JSON.stringify(obj), (err) => {
        this.log("Conf File erstellt");
    })
  }
}

createConfig.description = `creates a new config file`

createConfig.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = createConfig;