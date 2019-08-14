const fs = require('fs');
const path = require('path');

function logEvents(log){
    getAllConfigFiles((res) => {
        const cd = new Date().YYYYMMDDHHMMSS();
        if(res.length == 0){
            let logDir = "C:\\MSSQL-Backup\\logs";
            fs.writeFile(logDir+"\\logs_"+cd, log.split("\n").join(" ")+";\n", (err) => {
                if(err) throw err;
            });
        }
        else {
            fs.readFile(res[res.length-1], 'utf-8', (err, data) => {
                if(((data.split(";").length-1) >= 100)){
                    let logDir = "C:\\MSSQL-Backup\\logs";
                    fs.writeFile(logDir+"\\logs_"+`${cd}`, log.split("\n").join(" ")+"\n", (err) => {
                        if(err) throw err;
                    });
                }
                else{
                    let nLog = res[res.length-1]
                    fs.appendFile(nLog, "\n"+(log.split("\n").join(" "))+";\n", (err) => {
                        if(err) throw err;
                    })
                }
            })
        }
    })
}

function getAllConfigFiles(callback){
    let logDir = "C:\\MSSQL-Backup\\logs"; //get directory which contains the files
    fs.readdir(ConfDir, (err, files) => {
        if(err) throw err;
        let confArr = [];
        let i = 0;
        files.forEach((file) => {
           confArr[i] = ConfDir+"/"+file;
           i++;
        });
        callback(confArr);
    });
}

Object.defineProperty(Date.prototype, 'YYYYMMDDHHMMSS', {
    value: function() {
        function pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        }

        return this.getFullYear() +
               "-" + pad2(this.getMonth() + 1) + 
               "-" + pad2(this.getDate()) +
               "-" + pad2(this.getHours()) +
               "-" + pad2(this.getMinutes()) +
               "-" + pad2(this.getSeconds());
    }
});

module.exports = logEvents;