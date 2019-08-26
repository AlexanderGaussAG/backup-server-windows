const exec = require('child_process').exec;
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { base64encode, base64decode } = require('nodejs-base64');

function get(param, callback){
    exec(`SqlCmd -S "${param.host}" -U ${param.username} -P ${param.password} -Q "SELECT name FROM sys.databases"`, (err, stdout, stderr) => {
        if(err) throw err;
        else if(stderr) throw stderr;
        callback(stdout.substring(390, stdout.length-120))
    })
}

function parser(data){
    data = data.split("\n");
    for(i=0;i<=data.length-1;i++){
        data[i] = data[i].split("\r").join("");
    }
    return data;
}


function table(callback){
    inquirer
    .prompt([
      {
        type: 'list',
        name: 'configtype',
        message: 'Do you want to use cli or web configuartion',
        choices: [
          { name: 'CLI', disabled: false },
          { name: 'Web', disabled: true }
        ]
        }
    ])
    .then(answers => {
      if(answers.configtype == "CLI"){
          inquirer.prompt([
              {
                  type: 'input',
                  name: 'dbHost',
                  message: 'database hostname'
              },
              {
                  type: 'input',
                  name: 'dbUsername',
                  message: 'database username'
              },
              {
                  type: 'input',
                  name: 'dbPassword',
                  message: 'database password'
              }
          ])
          .then(answers => {
            param = {
                host: answers.dbHost,
                username: answers.dbUsername,
                password: answers.dbPassword
            }
            get(param, (res) => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: "dbselection",
                        message: 'choose a database',
                        choices: parser(res.split(' ').join(""))
                    }
                ])
                .then(answersDB => {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'ttl',
                            message: 'ttl'
                        },
                        {
                            type: 'input',
                            name: 'cron',
                            message: 'Cron-Time'
                        }
                    ])
                    .then(answersTTLCron => {
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'dirlist',
                                message: 'In how many directories do you want to store the Backups?'
                            }
                        ])
                        .then(answersdircount => {
                            let l = [];
                            for(i=0;i<=answersdircount.dirlist-1;i++){
                                l[i] = {
                                    type: 'input',
                                    name: 'dirname'+i,
                                    message: 'directory'
                                }
                            }
                            inquirer.prompt(l)
                            .then(answersDirList => {
                                dirCreation(answersDirList);
                                inquirer.prompt([
                                    {
                                        type: 'input',
                                        name : 'rcvEmails',
                                        message: 'Do you want to recieve status-emails (Y/N)'
                                    }
                                ])
                                .then(stEmailsanswer => {
                                    if(stEmailsanswer.rcvEmails == "Y" || stEmailsanswer.rcvEmails == "y" || stEmailsanswer.rcvEmails == "yes" || stEmailsanswer.rcvEmails == "j" || stEmailsanswer.rcvEmails == "true" || stEmailsanswer.rcvEmails == "ja"){
                                        inquirer.prompt([
                                            {
                                                type: 'input',
                                                name: 'email',
                                                message: 'Email Address'
                                            }
                                        ])
                                        .then(emailEmailanswer => {
                                            param = {
                                                db: {
                                                    user: answers.dbUsername,
                                                    password: base64encode(answers.dbPassword),
                                                    server: answers.dbHost,
                                                    database: answersDB.dbselection
                                                },
                                                backupFolder: generatePaths(answersDirList),
                                                email: emailEmailanswer.email,
                                                sendEmail: true,
                                                cronTime: answersTTLCron.cron,
                                                ttl: answersTTLCron.ttl
                                            }
                                            callback(param)
                                        })
                                    }
                                    else{
                                        param = {
                                            db: {
                                                user: answers.dbUsername,
                                                password: base64encode(answers.dbPassword),
                                                server: answers.dbHost,
                                                database: answersDB.dbselection
                                            },
                                            backupFolder: generatePaths(answersDirList),
                                            email: "<NO EMAIL>",
                                            sendEmail: false,
                                            cronTime: answersTTLCron.cron,
                                            ttl: answersTTLCron.ttl
                                        }
                                        callback(param)
                                    }
                                })
                            })
                        })
                    })
                })
                
            })
          })
      }
      else{
          console.log("Web configuration is not availible yet");
      }
    });
}

module.exports = table;


function generatePaths(dirlist){
    let l = getDirlength(dirlist);
    
    let otp = '['
    for(i=0;i<=l-1;i++){

        

        if(i == l-1){
           
            otp +='{"path": "'+dirlist['dirname'+i].split(`\\`).join("/")+'"}';
        }

        else{
            otp += '{"path": "'+dirlist['dirname'+i].split("\\").join("/")+'"},';
        }

    }
    return JSON.parse(otp+']');
}

function dirCreation(dirlist){
    let l = getDirlength(dirlist);
    for(i=0;i<=l-1;i++){
        let curdir = dirlist['dirname'+i];
        if(!fs.existsSync(curdir)){
            fs.mkdirSync(curdir)
        }
    }
}

function getDirlength(dirlist){
    for(i=99;i>=0;i--){
        try{
            if(dirlist['dirname'+i]){
                return i+1;
            }
        }
        catch(err){
          
        }
    }
}


