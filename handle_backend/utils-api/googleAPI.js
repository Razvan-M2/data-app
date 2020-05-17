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
//iuliabapi
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
        googleTrends.interestOverTime(  {keyword: cluster.keyword, 
                                         startTime: cluster.startTime,
                                         endTime: cluster.endTime, 
                                         geo: cluster.geo},
            (err,result)=>{    
            
            }
        );
    }
    
}