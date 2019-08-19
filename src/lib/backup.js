const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const { base64encode, base64decode } = require('nodejs-base64');
const mail = require("./mail");
const param = require("C:\\MSSQL-Backup\\MSSQL-Backup-Config\\mail.json");

function init(params, callback){
    for(let i = 0; i<= (params.backupFolder).length-1;i++){
        var datetime = new Date();
        console.log(datetime);
        datetime = (""+datetime).split(":").join("-");
        const backup = `SqlCmd -S "${(params.db.server).split("/").join("\\")}" -U ${params.db.user} -P ${base64decode(params.db.password)} -Q "BACKUP DATABASE [${params.db.database}] TO DISK='${(params.backupFolder[i].path).split("/").join("\\")+params.db.database+datetime+".bak"}'"`
        exec(backup, (err, stdout, stderr) => {
            if(err){callback(err); mail(param, false)}
            else if(stdout){
                const validate = `SqlCmd -S "${(params.db.server).split("/").join("\\")}" -U ${params.db.user} -P ${base64decode(params.db.password)} -Q "RESTORE VERIFYONLY FROM DISK = '${(params.backupFolder[i].path).split("/").join("\\")+params.db.database+datetime+".bak"}'"`
                exec(validate, (err, stdout, stderr) => {
                    if(err){callback(err); mail(param, false)}
                    else if(stdout){
                        callback(stdout);
                        mail(param, true);
                    }
                    else if(stderr){callback(stderr); mail(param, false)}
                })
            }
            else if(stderr){callback(stderr); mail(param, false)}
        });
    }
}

module.exports = init;