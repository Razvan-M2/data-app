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
        //console.log(this.#trendingGraph.chart.canvas);
        this.#trendingGraph.chart.canvas.style.height = "50vh";
        this.#trendingGraph.chart.canvas.style.width = '70%';

    }
    updateTrendingChart = (cluster) => {
        //console.log(cluster);
        this.#trendingGraph.chart.data.datasets[0].label = `Trending rate of the searched keyword by counties`;
        this.#trendingGraph.chart.data.labels = cluster.dataPoints.label;
        this.#trendingGraph.chart.data.datasets[0].data = cluster.dataPoints.data;
        this.#trendingGraph.chart.data.datasets[0].backgroundColor = cluster.backColors;
        this.#trendingGraph.chart.data.datasets[0].borderColor = cluster.bordColors;
        this.#trendingGraph.chart.update();
    }
    createInterestOverTimeGraph = (cluster) => {
        var ctx = document.getElementById('chart2').getContext('2d');

        this.#interestOverTimeGraph = new Chart(ctx, {
            type: 'line',
            data: {
                labels: cluster.dataPoints.labels,
                datasets: [{
                    label: cluster.title,
                    data: cluster.dataPoints.data,
                    backgroundColor:cluster.backgroundColor,
                    borderColor:cluster.borderColor
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

        this.#interestOverTimeGraph.canvas.style.height = "50vh";
        this.#interestOverTimeGraph.canvas.style.width = '70%';
    }
    updateInterestOverTimeGraph = (cluster) => {
        this.#interestOverTimeGraph.data.labels = cluster.dataPoints.labels;
        this.#interestOverTimeGraph.chart.data.datasets[0].data = cluster.dataPoints.data;
        this.#interestOverTimeGraph.chart.data.datasets[0].label = cluster.title;
        this.#interestOverTimeGraph.chart.data.datasets[0].backgroundColor=cluster.backgroundColor;
        this.#interestOverTimeGraph.chart.data.datasets[0].borderColor=cluster.borderColor;
        this.#interestOverTimeGraph.update();
    }

    getTrendingGraphData = () => {
        return this.#trendingGraph.chart.data.datasets;
    }

    getInterestOverTime = () => {
        return this.#interestOverTimeGraph.data.datasets;
    }

}

var graphs = new GraphCollection();