const nodemailer = require('nodemailer');
const smtpAuth = require('smtp');
const smtpAuth = require('C:\\MSSQL-Backup\\MSSQL-Backup-Config\\mail.json');

async function main(param, status){

    let transporter = nodemailer.createTransport({
        host: smtpAuth.host,
        port: smtpAuth.port,
        secure: smtpAuth.secure,
        auth: {
            user: smtpAuth.auth.user,
            pass: smtpAuth.auth.password
        }
    });

    let crDate = new Date();

    if(status == true){
      transporter.sendMail({
            from: '"MSSQL-Backup" <mssqlbackup@pc-web.at>',
            to: to,
            subject: "Backup Erfolgreich",
            text: `Das Backup wurde erfolgreich erstellt und auf dem Pfad ${param.backupFolder[0].path}  hinterlegt`,
            html: `<b><h1>BACKUP ERFOLGREICH</h1>\nDas Backup von ${param.db.database} wurde erfolgreich erstellt und auf dem Pfad "${param.backupFolder[0].path}" hinterlegt <hr> ${crDate}</b>`
        });
    }

    else{
     transporter.sendMail({
            from: '"MSSQL-Backup" <mssqlbackup@pc-web.at>',
            to: to,
            subject: "Backup Nicht Erfolgreich",
            text: `Das Backup wurde erfolglos erstellt und nicht auf dem ${param.backupFolder[0].path} hinterlegt`,
            html: `<b><h1>BACKUP NICHT ERFOLGREICH</h1>\nDas Backup von ${param.db.database} wurde erfolglos erstellt und nicht auf dem Pfad "${param.backupFolder[0].path}" hinterlegt <hr> ${crDate}</b>`
        });
    }

}

module.exports = main;