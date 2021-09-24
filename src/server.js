const express = require('express');
const fs = require('fs')

const app = express();

let fileNumber = 1;
const filePath = __dirname+'/../public/uploads/' 
app.get('/', (req, res) =>{

    let fileData;
    fs.readFile(filePath+'hello.txt', (err, data) => {
        if (err) console.error(err);
        console.log(data.toString());
        fileData = data.toString()
        res.status(200).json({"Request Method": 'GET', "Data": fileData})
    })
})

app.post('/', (req, res) => {
    
    let reqText = req.query.text;
    if (reqText === undefined){
        res.status(200).json({"Error": 'Give the File name And content'})
        return
    }
    fileNumber++;
    let newFilePath = filePath+'newFile'+fileNumber+'.txt'
    fs.writeFile(newFilePath, reqText, (err) => {
        if(err) console.error(err);
        res.status(200).json({"Request Method": 'POST', "File Created with":'newFile'+fileNumber+'.txt'})
    })    
})

app.put('/', (req, res) => {

    let reqText = req.query.text;
    let reqFile = req.query.file;
    if (reqText === undefined && reqFile === undefined){
        res.status(200).json({"Error": 'Give the File name And content'});
        return
    }
    fs.writeFile(filePath+reqFile, reqText, (err) => {
        if (err) console.error(err);
        res.status(200).json({"Request Method": 'PUT', 'File Modified':reqFile})
    })
})

app.delete('/', (req, res) => {

    let reqFile = req.query.file;
    if (reqFile === undefined){
        res.status(200).json({"Error": 'Specify the File to be Deleted'});
        return
    }
    fs.unlink(filePath+reqFile, (err) => {
        if (err) console.error(err)
        res.status(200).json({"Request Method": 'DELETE', "File Deleted": reqFile})
    })
})

app.options('/', (req, res) => {
    res.status(200).json({"Request Method": 'OPTIONS'})
})

app.listen(3001, ()=>{
    console.log("Server Started")
});
