const dictionaryAPI = require('oxford-dictionary');

var config = {
    app_id : "4740715f",
    app_key : "d153ff8eafb8b6d5da05bb266eac50ee",
    source_lang : "en-us"
  };
var dictionary = new dictionaryAPI(config);



module.exports = {

    getTranslation: (keyword,response) => {
        
        let definitions = {},pronunciations = {},examples = {}, categories;
        

        var define = dictionary.definitions(keyword);
        var pronounce = dictionary.pronunciations(keyword);
        var exemplify = dictionary.examples(keyword);

        define.then((def) => {
            definitions = def;
            pronounce.then((pron) => {
                pronunciations = pron;
                exemplify.then((exem)=>{
                    examples = exem;
                    response.send({ keyword:keyword,
                                    def:definitions.results[0].lexicalEntries,
                                    pronon:pronunciations.results[0].lexicalEntries,
                                    exem:examples.results[0].lexicalEntries});
                },(err)=>{
                    try{
                        if(err)
                            throw err;
                    }
                    catch(err){
                        console.log("Error in finding the word examples");
                        console.log(err);
                    }
                })
            },(err) => {
                try{
                    if(err)
                        throw err;
                }
                catch(err){
                    console.log("Error in finding the word pronunciations");
                    console.log(err);
                }
            })
        },(err) => {
            try{
                if(err)
                    throw err;
            }
            catch(err){
                console.log("Error in defining the word!");
                console.log(err);
            }
            
        });
    }

}
