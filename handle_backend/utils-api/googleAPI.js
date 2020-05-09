const googleTrends = require('google-trends-api');
const beautify = require('json-beautify');


module.exports = {

    getTrends : (object,res) => {

        googleTrends.interestByRegion(object, function(err, result){
            if(err) console.error('there was an error!', err);
            else{ 
                var obj = JSON.parse(result);
                // console.log(obj.default);
                res.send(beautify(obj.default.geoMapData,null,2,100));
            };
        })

    },

    getAutocomplete : (text,res) => {
        
        googleTrends.autoComplete({keyword: text},function(err,result){
            if(err)
                throw err;
            else{
                var obj = JSON.parse(result)
                res.send(beautify(obj,null,2,100));
            };
        });

    },

    getInterestOverTime : (cluster,res) => {
        googleTrends.interestOverTime(  {keyword: cluster.keyword, 
                                         startTime: cluster.startTime,
                                         endTime: cluster.endTime, 
                                         geo: cluster.geo},
            (err,result)=>{
                console.log(result);    
            
            }
        );
    }
    
}