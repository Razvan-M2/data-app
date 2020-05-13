/*****      HERE WE CREATE, UPDATE AND MANAGE OUR CLASSES INSTANCES   ******/

class GraphCollection{

    #graphs;
    
    constructor(){
        this.#graphs = [];
    }

    addGraph = (id,parent,dataPoints,backColors,bordColors) => {

        var ctx = document.getElementById(id).getContext('2d');

        this.#graphs.push(
            {
                chart:new Chart(ctx, {
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
                    },
            }),
                container:parent,
                id:id
        }
        );

    }

    updateGraphs = (datasets) => {

    }

    getGraphs(){
        return this.#graphs;
    }

}

var chart = new GraphCollection();