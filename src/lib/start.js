const config = require('./configparser');
const timer = require("./timer");
const log = require('./logger');
const mail = require('./mail');
const backup = require('./backup');

function init(){
    config((res) => {
        for(let i = 0; i<= (res.conf).length -1; i++){
            timer(res.conf[i], (Tres) => {
                backup(res.conf[i], (Bres) => {
                    log(Bres);
                })
            });
        }
    });
}

init();
