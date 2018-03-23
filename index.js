const fs = require('fs');
const path = require('path');
const pdfUtil = require('pdf-to-text');


const SOURCE = './source';
const OUTPUT = './output';

fs.readdir(SOURCE, (err, list)=>{
    if(err){
       return console.log(err);
    }
    let processed = 0;
    list.forEach((file)=>{
        const fileToConvertPath = path.join(SOURCE, file);
        pdfUtil.pdfToText(fileToConvertPath, null, function(err, data){
            if(err){
                console.log(err);
            } else {
                const name = file.split('.pdf')[0];
                const newName = `${name}.txt`;
                const txtPath = path.join(OUTPUT, newName);
                fs.writeFile(txtPath, data, (err)=>{
                    if (err){
                        console.log(err);
                    }
                processed ++;
                console.log(`convertiti ${processed} files`);
                });
            }
        })
    })
})




/*
var pdfUtil = require('pdf-to-text');
var pdf_path = "absolute_path/to/pdf_file.pdf";
 
pdfUtil.pdfToText(upload.path, null, function(err, data) {
  if (err) throw(err);
  console.log(data); //print text     
});
 
//Omit option to extract all text from the pdf file 
pdfUtil.pdfToText(upload.path, function(err, data) {
  if (err) throw(err);
  console.log(data); //print all text     
});
*/