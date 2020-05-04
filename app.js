const express = require('express');
const app = express();
const googleAPI = require('./handle_backend/handle_data/googleAPI'); 
const fs = require('fs');

//loaded environment variables from .env file
require('dotenv').config();

//inputed the object resulted from reading the geoCodes json in a constant
const countries = JSON.parse(fs.readFileSync(process.env.GEOCODES));

app.use('/bootstrap-4.4.1-dist',express.static('bootstrap-4.4.1-dist'));
app.use('/scripts',express.static('scripts'));
app.use('/style',express.static('style'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/main.html');

});

//Get request with plain pathname main2
app.get('/main2', (req,res) => {
    res.sendFile(__dirname + "/main2.html");
});

//Middleware example to path main2
app.use('/main2/:id', (req,res)=>{
    res.sendFile(__dirname + "/main2.html");
    console.log(req.params);
});

//Middleware for trendings by country name translated to geoName in geoCodes
app.use('/trends/:id', (req,res) => {
    googleAPI.getTrends({keyword: 'Coronavirus',
                          startTime: new Date(Date.now() - (24 * 7 * 60 * 60 * 1000)),
                          geo:countries[req.params.id]
                         },res);
});


app.use('/typing/:token', (req,res) => {
    googleAPI.getAutocomplete(req.params.token,res);
});


module.exports = app;