const fs = require('fs');
const path = require('path');
const log = require("./logger");

function init(param){
    for(i=0; i<= (param.backupFolder).length-1; i++){
        getAllConfigFiles(param.backupFolder[i].path, (res) => {
            if(res.length > param.ttl){
                fs.unlink(res[0], (err) => {
                    if(err){
                        log(err);
                    }
                    else{
                        log("File "+res[0]+" was successfully deleted");
                    }
                });
            }
        });
    }
}

function getAllConfigFiles(param, callback){
    let ConfDir = param; //get directory which contains the files
    fs.readdir(ConfDir, (err, files) => {
        if(err){
            log(err);
        }
        let confArr = [];
        let i = 0;
        files.forEach((file) => {
           confArr[i] = ConfDir+"\\"+file;
           i++;
        });
        callback(confArr);
    });
}

module.exports = init;

