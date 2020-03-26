const googleTrends = require('google-trends-api');
const beautify = require('json-beautify');

//{keyword: 'Women\'s march'}
module.exports = {
    getTrends : function getTrends(object,res){

        googleTrends.interestByRegion(object, function(err, results){
            if(err) console.error('there was an error!', err);
            else{ 
                var obj = JSON.parse(results);
                console.log(beautify(obj.default.geoMapData,null,2,100));
                res.send(beautify(obj.default.geoMapData,null,2,100));
            };
        })

    }
    
}
// module.exports = googleTrends;