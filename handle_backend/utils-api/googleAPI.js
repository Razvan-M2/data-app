const googleTrends = require('google-trends-api');
const beautify = require('json-beautify');


module.exports = {

    getTrends : function(object,res){

        googleTrends.interestByRegion(object, function(err, result){
            if(err) console.error('there was an error!', err);
            else{ 
                var obj = JSON.parse(result);
                res.send(beautify(obj.default.geoMapData,null,2,100));
            };
        })

    },

    getAutocomplete : function(text,res){
        
        googleTrends.autoComplete({keyword: text},function(err,result){
            if(err)
                throw err;
            else{
                var obj = JSON.parse(result)
                res.send(beautify(obj,null,2,100));
            };
        });

    },

    getInterestOverTime : function(cluster,res){
        googleTrends.interestOverTime(  cluster,
            function(err,result){   
                if(err)
                    throw err; 
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