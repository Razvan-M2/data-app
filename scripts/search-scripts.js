var chart;
var keyword;
var dataPoints = {
    label: [],
    data: []
};


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }


var backColors=[];
var bordColors=[];
$(document).ready(function(){

    $.ajax({
        url: "/allCountries",
        type:"get",
        dataType: "json",
        success: function(data){
            data.forEach((item) => {
                    var obj = `<option value="${item}">${item}</option>`;
                    $('#countries').append(obj);});
            data.forEach( (index,valoare) => {
                
            })
    }
    });

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
        bordColors.pop();
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

    $('#chartContainer').remove();
    $('body').append("<canvas id='chartContainer' style='height: 300px; width: 50%;'></canvas>");
    console.log(backColors);
    console.log(bordColors);
    chart = diagram("chartContainer",dataPoints,backColors,bordColors);
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
  