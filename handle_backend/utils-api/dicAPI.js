const dictionaryAPI = require('oxford-dictionary-api');
require('dotenv').config();

// var config = {
//     app_id : process.env.APP_ID,
//     app_key : process.env.APP_KEY,
//     source_lang : "en-us"
//   };

var dictionary = new dictionaryAPI(process.env.APP_ID,process.env.APP_KEY);

module.exports = {

    getData: (keyword,res) => {
        dictionary.find(keyword,(err,data) => {
            if(err)
                throw err;
            else{
                res.send(data.results)
            }
        });
    }

}
