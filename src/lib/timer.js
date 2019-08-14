var CronJob = require('cron').CronJob;

function init(param, callback){
    new CronJob(param.cronTime, function() {
        callback("event");
    }, null, true, 'Europe/Vienna');
}

module.exports = init;