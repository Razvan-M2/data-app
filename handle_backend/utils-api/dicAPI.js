const dictionaryAPI = require('oxford-dictionary-api');
require('dotenv').config();

// var config = {
//     app_id : process.env.APP_ID,
//     app_key : process.env.APP_KEY,
//     source_lang : "en-us"
//   };

var dictionary = new dictionaryAPI(process.env.APP_ID,process.env.APP_KEY);



module.exports = {

    getTranslation: (keyword,res) => {
        
        dictionary.find(keyword,(err,data) => {
            try{
            if(err)
                throw err;
            else{
                res.send(data.results)
            }
            }catch{
                console.log(err);
            }
        });
    }

}
