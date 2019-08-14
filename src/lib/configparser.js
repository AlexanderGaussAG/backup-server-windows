const fs = require('fs');
const path = require('path');

function getAllConfigFiles(callback){
    let ConfDir = "C:\\MSSQL-Backup\\configs"; //get directory which contains the files
    fs.readdir(ConfDir, (err, files) => {
        if(err) throw err;
        let confArr = [];
        let i = 0;
        files.forEach((file) => {
           confArr[i] = ConfDir+"\\"+file;
           i++;
        });
        callback(confArr);
    });
}

function init(callback){
    getAllConfigFiles((res) => {
        mkGlobalConfig(res, (response) => {
            callback(JSON.parse(response));
        });
    });
}

function mkGlobalConfig(data, callback){
    let cnfig = `{"conf": [`
    for(i=0;i<=data.length-1;i++){
       let res = fs.readFileSync(data[i], 'utf-8');
        if(i == data.length-1){
            cnfig+=res;
        }
        else{
            cnfig+=res+",";
        }
    }
    cnfig+="]}";
    callback(cnfig);
}

module.exports = init;