const nodemailer = require('nodemailer');
const smtpAuth = require('C:\\MSSQL-Backup\\MSSQL-Backup-Config\\mail.json');

async function main(param, status, row){

    if(param.sendEmail){

    let transporter = nodemailer.createTransport({
        host: smtpAuth.smtp.host,
        port: smtpAuth.smtp.port,
        secure: smtpAuth.smtp.secure,
        auth: {
            user: smtpAuth.smtp.auth.user,
            pass: smtpAuth.smtp.auth.password
        }
    });

    let crDate = new Date();

    if(status == true){
      transporter.sendMail({
            from: '"MSSQL-Backup" <mssqlbackup@pc-web.at>',
            to: param.email,
            subject: "Backup Erfolgreich",
            text: `Das Backup wurde erfolgreich erstellt und auf dem Pfad ${param.backupFolder[row].path}  hinterlegt`,
            html: `<b><h1>BACKUP ERFOLGREICH</h1>\nDas Backup von ${param.db.database} wurde erfolgreich erstellt und auf dem Pfad "${param.backupFolder[row].path}" hinterlegt <hr> ${crDate}</b>`
        });
    }

    else{
     transporter.sendMail({
            from: '"MSSQL-Backup" <mssqlbackup@pc-web.at>',
            to: param.email,
            subject: "Backup Nicht Erfolgreich",
            text: `Das Backup wurde erfolglos erstellt und nicht auf dem ${param.backupFolder[row].path} hinterlegt`,
            html: `<b><h1>BACKUP NICHT ERFOLGREICH</h1>\nDas Backup von ${param.db.database} wurde erfolglos erstellt und nicht auf dem Pfad "${param.backupFolder[row].path}" hinterlegt <hr> ${crDate}</b>`
        });
    }
    }

}

module.exports = main;