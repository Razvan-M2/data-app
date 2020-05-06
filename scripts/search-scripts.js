var chart;
var keyword;
var dataPoints = {
    label: [],
    data: []
};

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
        dataPoints.label.pop();
        dataPoints.data.pop();
    } 


    console.log(arguments);
    for (var i = 0; i < arguments[0].length; i++) {
        if(arguments[0][i].value[0] == 0 )
            continue;
        // dataPoints.push({
        //     label: arguments[0][i].geoName,
        //     y: arguments[0][i].value[0],});
        dataPoints.label.push(arguments[0][i].geoName);
        dataPoints.data.push(arguments[0][i].value[0]);
    }
    $('#chartContainer').remove();
    $('body').append("<canvas id='chartContainer' style='height: 300px; width: 50%;'></canvas>");

    chart = diagram("chartContainer",dataPoints);
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
  