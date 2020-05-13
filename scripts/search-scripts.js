var keyword;
var dataPoints = {
    label: [],
    data: []
};
var backColors=[];
var bordColors=[];
var graphs = new GraphCollection();

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

$(document).ready(function(){

    $('#countries').click(()=>{
        if($('#keyInput').val().length == 0)
            alert("Please input a keyword first!");
    });

    $('keyInput').submit( ()=>{
        var selected_country = $('#countries').val();
        console.log(selected_country);
        getData(selected_country);
    });

});

function addData() {

    while(dataPoints.length > 0) {
        dataPoints.label.pop();
        dataPoints.data.pop();
        backColors.pop();
    } 

    console.log(arguments);
    for (var i = 0; i < arguments[0].length; i++) {
        if(arguments[0][i].value[0] == 0 )
            continue;

        dataPoints.label.push(arguments[0][i].geoName);
        dataPoints.data.push(arguments[0][i].value[0]);
        let one=getRandomIntInclusive(0, 255);
        let two=getRandomIntInclusive(0, 255);
        let three=getRandomIntInclusive(0, 255);
        backColors.push('rgba('+one+','+two+','+three+','+0.3+')');
        bordColors.push('rgba('+one+','+two+','+three+','+1+')');
        //'rgba(255, 99, 132, 0.3)'
    }

    $('#chart1').remove();
    $('#trendingChart').append("<canvas id='chart1' style='height: 300px; width: 50%;'></canvas>");
    console.log(backColors);
    console.log(bordColors);
    var cluster1 = {
        container : 'trendingChart',
        id: 'chart1',
        dataPoints: dataPoints,
        backColors : backColors,
        bordColors : bordColors
    }
    graphs.addGraph(cluster1);
}

function getData(country){

    keyword = $('#keyInput').val();

    $.ajax({
        url: "/trends/"+country+"/"+keyword,
        type:"get",
        dataType: "json",
        success: function(data){
            addData(data);
        }
    });

   
}   
  