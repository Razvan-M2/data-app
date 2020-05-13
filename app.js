const express = require('express');
const app = express();
const googleAPI = require('./handle_backend/utils-api/googleAPI');
const utilityAPI = require('./handle_backend/utilityAPI'); 
const fs = require('fs');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
//loaded environment variables from .env file
require('dotenv').config();


app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/font-awesome',express.static('font-awesome'));
app.use('/bootstrap-4.4.1-dist',express.static('bootstrap-4.4.1-dist'));
app.use('/scripts',express.static('scripts'));
app.use('/style',express.static('style'));
app.use('/charts_js',express.static('charts_js'));

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
 

app.get('/', (req,res) => {
    //res.sendFile(__dirname + '/home.html');
    res.render('home');
});

//Get request with plain pathname search
app.post('/search', (req,res) => {
    //res.sendFile(__dirname + "/search.html");
    res.render('search',{ searchedKeyword:req.body.keyword });
});

app.get('/search', (req,res) => {
    res.render('search',{ searchedKeyword:"cats"});
});

//Middleware for trendings by country name translated to geoName in geoCodes
app.use('/trends/:country/:keyword/:time', (req,res) => {
    var time = req.params.time;
    var countryCode = utilityAPI.countriesAPI.getCountryCodeByName(req.params.country);
    var keyword = req.params.keyword;
    utilityAPI.googleTrendsAPI.getTrends(  {keyword: keyword,
                                            startTime: new Date(Date.now() - time),
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