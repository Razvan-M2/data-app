function diagram(id,dataPoints){

    var ctx = document.getElementById(id).getContext('2d');

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataPoints.label,
            datasets: [{
                label: 'Dumy diagram',
                data: dataPoints.data,
                backgroundColor: backColors,
                borderColor: bordColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive:false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });

}

//module.exports=diagram;