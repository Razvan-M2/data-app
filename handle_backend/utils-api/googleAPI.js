const googleTrends = require('google-trends-api');
const beautify = require('json-beautify');


module.exports = {

    getTrends : function(object,res){

        googleTrends.interestByRegion(object, function(err, result){
            if(err) console.error('there was an error in interest request!');
            else{ 
                var obj = JSON.parse(result);
                res.send(beautify(obj.default.geoMapData,null,2,100));
            };
        })

    },

    getAutocomplete : function(text,res){
        
        googleTrends.autoComplete({keyword: text},function(err,result){
            try{
                if(err)
                    console.log('there was an error in autocomplete request');
                //    throw err;
            //else{
                    try{
                        var obj = JSON.parse(result)
                        res.send(beautify(obj,null,2,100));
                    }
                    catch(errParsing){
                        console.log("Error in parsing the autocomplete JSON");
                    }
                }
            //}
            catch(err){
                console.log('there was an error in autocomplete request');
            }
        });

    },

    getInterestOverTime : function(cluster,res){
        googleTrends.interestOverTime(  cluster,
            function(err,result){   
                if(err)
                    console.log("There was an error in interest request!");
                    // throw err; 
                else{
                    //var obj = JSON.parse(result)
                    //console.log(result);
                    res.send(result);
                }
            }
        );
    },

    getRelatedQueries : function (cluster,res){
        googleTrends.relatedTopics(cluster,
            function(err,result){
                if(err)
                    throw err;
                else{
                    res.send(result);
                }
            })
    },

    getRelatedTopics : function (cluster,res){
        googleTrends.relatedTopics(cluster,
            function(err,result){
                if(err)
                    throw err;
                else{
                    res.send(result);
                }
            })
    }
    
}