/*****      HERE WE CREATE, UPDATE AND MANAGE OUR CLASSES INSTANCES   ******/

class GraphCollection{

    #trendingGraph;
    
    constructor(){
        this.#trendingGraph = {};
    }

    createTrendingGraph = (cluster1) => {

        var ctx = document.getElementById(cluster1.id).getContext('2d');

        this.#trendingGraph = {
            id : cluster1.id,
            container : cluster1.container,
            chart : new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: cluster1.dataPoints.label,
                    datasets: [{
                        label: `The trending by counties`,
                        data: cluster1.dataPoints.data,
                        backgroundColor: cluster1.backColors,
                        borderColor: cluster1.bordColors,
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
            })
        }

    }

    createInterestOverTimeGraph = (cluster) => {

    }

    updateGraphs = (cluster1) => {

    }

    getGraphs(){
        return [this.#trendingGraph];
    }

}

var graphs = new GraphCollection();