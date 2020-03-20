const express = require('express');
const app=express();


app.use('/bootstrap-4.4.1-dist',express.static('bootstrap-4.4.1-dist'));
app.use('/scripts',express.static('scripts'));
app.use('/style',express.static('style'));


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/main.html');
});

app.get('/main2', (req,res) => {
    res.sendFile(__dirname + '/main2.html');
});

module.exports = app;