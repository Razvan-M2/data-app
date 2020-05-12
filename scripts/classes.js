/*****      HERE WE CREATE, UPDATE AND MANAGE OUR GRAPHS INSTANCES   ******/

class GraphCollection{

    #graphs;
    
    constructor(){
        this.#graphs = [];
    }

    addGraph = (graph,id) => {
        this.#graphs.push(graph,id);
    }

    getGraphs(){
        return this.#graphs;
    }

}

function diagram(id,dataPoints,backColors,bordColors){

    var ctx = document.getElementById(id).getContext('2d');
    // var ctx = $(id).getContext('2d');


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
