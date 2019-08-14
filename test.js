const editor = require('tiny-cli-editor');
const fs = require('fs');
let defconf = `#<THE NAME TO SAVE>\n# Type Ctrl + D to save and Exit\n# Type Ctrl + C to exit without save`;
editor(defconf)
    .on('data', (text) => {
        //let filename = text.substring(1, text.search("# Type Ctrl + C"));
        //console.log(text);
    })
    .on('abort', (text) => {
        // do something with the text
        console.log(text);
    })
    .on('submit', (text) => {
        // do something with the text
        let name = text.substr(1, 9);
        console.log(text.search("# Ctrl"))
        console.log("NAME: "+name);
        console.log("----------");
        console.log(text);
        fs.writeFile('C:\\MSSQL-Backup\\configs\\'+name+'.yml',text ,(err) => {
            if(err) throw err;
        });
    });