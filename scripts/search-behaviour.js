function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

generateTrendingChart = function(country,keyword){
    $.ajax({
        url: "/trends/"+country+"/"+keyword,
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
            return cluster1;
            //graphs.createTrendingGraph(cluster1);
            //graphs.initialize(cluster1);
        }
    });


    
    
}

function generateInterestOverTimeChart(country,keyword){

}

getMilliSeconds = (optionString) => {


    switch(optionString){
        case "1 ora":
            return;
        case "4 ore":
            return;         
        case "1 zi":
            return; 
        case "30 zile":
            return;     
        case "90 zile":
            return;
        case "12 luni":
            return;
        case "5 ani":
            return;
    }
}

function initiateData(country,keyword){

    var cluster1 = generateTrendingChart(country,keyword);
    console.log(cluster1);
    //generateInterestOverTimeChart(country,keyword);
}

updateCharts = (country, keyword, time) => {
    
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