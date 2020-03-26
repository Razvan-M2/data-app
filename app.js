const express = require('express');
const app = express();
const dataGoogle = require('./handle_backend/handle_data/googleAPI'); 

app.use('/bootstrap-4.4.1-dist',express.static('bootstrap-4.4.1-dist'));
app.use('/scripts',express.static('scripts'));
app.use('/style',express.static('style'));


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/main.html');

});

app.get('/main2', (req,res) => {
    results = dataGoogle.getTrends({keyword: 'Coronavirus',startTime: new Date(Date.now() - (48 * 60 * 60 * 1000)),geo:'RO'},res)

});

module.exports = app;