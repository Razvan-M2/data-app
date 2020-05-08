const express = require('express');
const app = express();
const googleAPI = require('./handle_backend/handle_data/googleAPI');
const utilityAPI = require('./handle_backend/utilityAPI'); 
const fs = require('fs');

//loaded environment variables from .env file
require('dotenv').config();

app.use('/bootstrap-4.4.1-dist',express.static('bootstrap-4.4.1-dist'));
app.use('/scripts',express.static('scripts'));
app.use('/style',express.static('style'));
app.use('/charts_js',express.static('charts_js'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/home.html');

});

//Get request with plain pathname search
app.get('/search', (req,res) => {
    res.sendFile(__dirname + "/search.html");
});

//Middleware example to path search
app.use('/search/:id', (req,res)=>{
    res.sendFile(__dirname + "/search.html");
    console.log(req.params);
});

//Middleware for trendings by country name translated to geoName in geoCodes
app.use('/trends/:country/:keyword', (req,res) => {
    var countryCode = utilityAPI.countriesAPI.getCountryCodeByName(req.params.country);
    var keyword = req.params.keyword;
    utilityAPI.googleTrendsAPI.getTrends(  {keyword: keyword,
                                            startTime: new Date(Date.now() - (4 * 24 * 60 * 60 * 1000)),
                                            geo:countryCode},
                                            res);
});


app.use('/typing/:token', (req,res) => {
    googleAPI.getAutocomplete(req.params.token,res);
});

app.get('/allCountries',(req,res) =>{
    res.send(utilityAPI.countriesAPI.getCountriesNameList());
});


module.exports = app;