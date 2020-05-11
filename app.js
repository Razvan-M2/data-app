const express = require('express');
const app = express();
const googleAPI = require('./handle_backend/utils-api/googleAPI');
const utilityAPI = require('./handle_backend/utilityAPI'); 
const fs = require('fs');

var timeManager=[{
    interval: "Ultima ora",
    miliseconds: 3600000 
},
{
    interval: "Ultimele 4 ore",
    miliseconds: 14400000 
},

{
    interval: "Ultimea zi",
    miliseconds: 86400000 
},
{
    interval: "Ultimeele 30 zile",
    miliseconds: 2592000000 
},
{
    interval: "Ultimeele 90 zile",
    miliseconds: 7776000000 
},
{
    interval: "Ultimele 12 luni",
    miliseconds: 31557600000 
},
{
    interval: "Ultimii 5 ani",
    miliseconds: 157788000000 
}
]

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

//Middleware for trendings by country name translated to geoName in geoCodes
app.use('/trends/:country/:keyword', (req,res) => {
    var countryCode = utilityAPI.countriesAPI.getCountryCodeByName(req.params.country);
    var keyword = req.params.keyword;
    utilityAPI.googleTrendsAPI.getTrends(  {keyword: keyword,
                                            startTime: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)),
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