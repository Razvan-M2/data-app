//var constructorDiagrama=require('./diagram');
var dataPoints = [];
var chart ;
var keyword;


$(document).ready(function(){

    $.ajax({
        url: "/allCountries",
        type:"get",
        dataType: "json",
        success: function(data){
        //console.log(data);
            data.forEach((item) => {
                    var obj = `<option value="${item}">${item}</option>`;
                    $('#countries').append(obj);});
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
        dataPoints.pop();}

    chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Searches with keyword "+keyword+" by selected country states"
        },
        axisY: {
            title: "Trending",
            titleFontSize: 12
        },
        data: [{
            type: "column",
            dataPoints: dataPoints
        }]
    });

    console.log(arguments);
    for (var i = 0; i < arguments[0].length; i++) {
        if(arguments[0][i].value[0] == 0 )
            continue;
        dataPoints.push({
            label: arguments[0][i].geoName,
            y: arguments[0][i].value[0],});
    }
    chart.render();
    diagram();
   
}

function getData(country){

    keyword = $('#keyInput').val();

    $.ajax({
        url: "/trends/"+country+"/"+keyword,
        type:"get",
        dataType: "json",
        success: function(data){
            //console.log(data);
            addData(data);
        }
    });

   
}   
  