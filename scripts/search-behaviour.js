getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

getMilliSecondsPrototype = (time) => {
    res = time.split(" ");
    var hour = 1000*60*60;
    var day = hour*24;
    var month = day*30;
    var year = month*12;
    switch(res[0]){
        case 'h':
            return hour*parseInt(res[1]);
            break;
        case 'd':
            return day*parseInt(res[1]);
            break;
        case 'm':
            return month*parseInt(res[1]);
            break;
        case 'y':
            return year*parseInt(res[1]);
            break;
        default:
            return day*7;
            break;
    }
}

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
        case '2 zile':
            return 
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
        url: "/trends/"+country+"/"+keyword+"/"+getMilliSecondsPrototype(time),
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

generateInterestOverTimeChart = (country,keyword,time) => {
    $.ajax({
        url: "/interest/"+country+"/"+keyword+"/"+getMilliSecondsPrototype(time)+"/"+0,
        type:"GET",
        dataType: "JSON",
        success: function(data){
            var array = data.default.timelineData;
            console.log(array);
            dataPoints = {
                labels: [],
                data: []
            }
            var backgroundColor,borderColor;

            for (var i = 0; i < array.length; i++) {
                if(array[i].value[0] == 0 )
                    continue;
        
                dataPoints.labels.push(array[i].formattedAxisTime);
                dataPoints.data.push(array[i].value[0]);
            }

            
            var cluster = {
                title:`Interest over time in ${$('#countries').val()}`,
                dataPoints: dataPoints,
                backgroundColor:('rgba('+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+0.1+')'),
                borderColor:('rgba('+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+0.3+')')
            }
            graphs.createInterestOverTimeGraph(cluster);
        }
    });

}

initiateData = (country,keyword,time) => {

    generateTrendingChart(country,keyword,time);
    generateInterestOverTimeChart(country,keyword,time);

}

updateCharts = (country, keyword, time) => {
    /*****  FOR ITRENDING PER STATE  *****/
    $.ajax({
        type: 'GET',
        url: '/trends/' + country + "/" + keyword + "/" + getMilliSecondsPrototype(time),
        success: (data) => {
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

            // console.log(backColors);
            // console.log(dataPoints);
            
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
    $.ajax({
        type: 'GET',
        url: "/interest/"+country+"/"+keyword+"/"+getMilliSecondsPrototype(time)+"/"+0,
        dataType: 'JSON',
        success: (data) => {
            var array = data.default.timelineData;
            console.log(array);
            dataPoints = {
                labels: [],
                data: []
            }

            for (var i = 0; i < array.length; i++) {
                if(array[i].value[0] == 0 )
                    continue;
        
                dataPoints.labels.push(array[i].formattedAxisTime);
                dataPoints.data.push(array[i].value[0]);
            }


            var cluster = {
                title:`Interest over time in ${country}`,
                dataPoints: dataPoints,
                backgroundColor:('rgba('+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+0.1+')'),
                borderColor:('rgba('+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+getRandomIntInclusive(0, 255)+','+0.3+')')
            }
            graphs.updateInterestOverTimeGraph(cluster);
        },
    });

}

handleSearch = () => {
    var selected_country = $('#countries').val();
    var keyword = $('#keyInput').val();
    var time = $('#time').val();
    updateCharts(selected_country,keyword,time);
}


$(document).ready(()=>{

    // $('#keyInput').bind("enterKey",function(e){
    //     handleSearch();
    // });

    $("#keyInput").on('keyup', function (e) {
        if (e.keyCode === 13) {
            handleSearch();
        }
    });


    $('#countries').change( () => {
        handleSearch();
    });

    $('#time').change( () => {
        handleSearch();
    });
});