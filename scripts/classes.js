/*****      HERE WE CREATE, UPDATE AND MANAGE OUR CLASSES INSTANCES   ******/

class GraphCollection{

    #trendingGraph;
    #interestOverTimeGraph;

    constructor(){
        this.#trendingGraph = {};
    }

    createTrendingGraph = (cluster) => {

        var ctx = document.getElementById(cluster.id).getContext('2d');

        this.#trendingGraph = {
            id : cluster.id,
            container : cluster.container,
            chart : new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: cluster.dataPoints.label,
                    datasets: [{
                        label: `Trending rate of the searched keyword by counties`,
                        data: cluster.dataPoints.data,
                        backgroundColor: cluster.backColors,
                        borderColor: cluster.bordColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    maintainAspectRatio:false,
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
        console.log(this.#trendingGraph.chart.canvas);
        this.#trendingGraph.chart.canvas.style.height = "50vh";
        this.#trendingGraph.chart.canvas.style.width = '70%';

    }
    updateTrendingChart = (cluster) => {
        console.log(cluster);
        this.#trendingGraph.chart.data.datasets[0].label = `Trending rate of the searched keyword by counties`;
        this.#trendingGraph.chart.data.labels = cluster.dataPoints.label;
        this.#trendingGraph.chart.data.datasets[0].data = cluster.dataPoints.data;
        this.#trendingGraph.chart.update();
    }
    createInterestOverTimeGraph = () => {
        var ctx = document.getElementById('chart2').getContext('2d');
        
        this.#interestOverTimeGraph = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [1,2,3,4,5,6,7,8],
                datasets: [{
                    label: `This is under development`,
                    data: [10,20,30,40,10,20,30,40]
                }]
            },
            options: {
                responsive:false,
                DrawOnChartArea:false
                // scales: {
                //     yAxes: [{
                //         stacked: true
                //     }]      
                // }
            }
        });

        this.#interestOverTimeGraph.chart.canvas.style.height = "50vh";
        this.#interestOverTimeGraph.chart.canvas.style.width = '70%';
    }
    updateInterestOverTimeGraph = (cluster) => {

    }

    getTrendingGraphData(){
        return this.#trendingGraph.chart;
    }

}

var graphs = new GraphCollection();