const countryAPI = require('./utils-api/countryAPI');
const googleTrends = require('./utils-api/googleAPI');
const dictionaryAPI = require('./utils-api/dicAPI');

module.exports = {

    countriesAPI : countryAPI,
    googleTrendsAPI : googleTrends,
    dictionaryAPI: dictionaryAPI
}