getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};
getMilliSeconds = (time) => {

    switch(time){
        case '1 ora':
            return 1000*60*60;
            break;
        case '4 ore':
            return 1000*60*60*4;
            break;
        case '1 zi':
            return 1000*60*60*24;
            break;
        case '7 zile':
            return 1000*60*60*24*7;
            break;
        case '30 zile':
            return 1000*60*60*24*30;
            break;
        case '90 zile':
            return 1000*60*60*24*90;
            break;
        case '12 luni':
            return 1000*60*60*24*30*12;
            break;
        case '5 ani':
            return 1000*60*60*24*30*12*5;
            break;
        default:
            return 1000*60*60*24*7;
            break;
    }
}

generateTrendingChart = (country,keyword,time) => {
    $.ajax({
        url: "/trends/"+country+"/"+keyword+"/"+getMilliSeconds(time),
        type:"get",
        dataType: "json",
        success: function(data){
            //console.log(data);
            backColors = [];
            bordColors = [];
            dataPoints = {
                label: [],
                data: []
            }

            for (var i = 0; i < data.length; i++) {
                if(data[i].value[0] == 0 )
                    continue;
        
                dataPoints.label.push(data[i].geoName);
                dataPoints.data.push(data[i].value[0]);
                let one=getRandomIntInclusive(0, 255);
                let two=getRandomIntInclusive(0, 255);
                let three=getRandomIntInclusive(0, 255);
                backColors.push('rgba('+one+','+two+','+three+','+0.3+')');
                bordColors.push('rgba('+one+','+two+','+three+','+1+')');
                //'rgba(255, 99, 132, 0.3)'
            }
            
            var cluster1 = {
                container : 'trendingChart',
                id: 'chart1',
                dataPoints: dataPoints,
                backColors : backColors,
                bordColors : bordColors
            }
            //return cluster1;
            graphs.createTrendingGraph(cluster1);
            //graphs.initialize(cluster1);
        }
    });


    
    
}

generateInterestOverTimeChart = (country,keyword) => {
    //createInterestOverTimeGraph
    graphs.createInterestOverTimeGraph();
}

initiateData = (country,keyword,time) => {

    generateTrendingChart(country,keyword,time);
    generateInterestOverTimeChart(country,keyword,time);
    
}

updateCharts = (country, keyword, time) => {
    /*****  FOR ITRENDING PER STATE  *****/
    $.ajax({
        type: 'GET',
        url: '/trends/' + country + "/" + keyword + "/" + getMilliSeconds(time),
        success: (data) => {
            console.log(data);
            backColors = [];
            bordColors = [];
            dataPoints = {
                label: [],
                data: []
            }

            for (var i = 0; i < data.length; i++) {
                if(data[i].value[0] == 0 )
                    continue;
        
                dataPoints.label.push(data[i].geoName);
                dataPoints.data.push(data[i].value[0]);
                let one=getRandomIntInclusive(0, 255);
                let two=getRandomIntInclusive(0, 255);
                let three=getRandomIntInclusive(0, 255);
                backColors.push('rgba('+one+','+two+','+three+','+0.3+')');
                bordColors.push('rgba('+one+','+two+','+three+','+1+')');
                //'rgba(255, 99, 132, 0.3)'
            }
            
            var cluster1 = {
                container : 'trendingChart',
                id: 'chart1',
                dataPoints: dataPoints,
                backColors : backColors,
                bordColors : bordColors
            }
            graphs.updateTrendingChart(cluster1);
        },
        dataType: 'JSON'
    });
    /*****  FOR INTEREST OVER TIME  *****/
    // $.ajax({
    //     type: 'GET',
    //     url: '/trends/' + country + "/" +keyword,
    //     success: (data) => {
    //         console.log(data);
    //     },
    //     dataType: 'JSON'
    // });

}

handleSearch = () => {
    var selected_country = $('#countries').val();
    var keyword = $('#keyInput').val();
    var time = $('#time').val();
    updateCharts(selected_country,keyword,time);
}


$(document).ready(()=>{

    $('#keyInput').bind("enterKey",function(e){
        handleSearch();
    });


    $('#countries').change( () => {
        handleSearch();
    });

    $('#time').change( () => {
        handleSearch();
    });
});