var canvas = document.getElementById("barChart");
var ctxs = canvas.getContext('2d');

// Global Options:
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

var data = {
    labels: ["En", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agost", "Sep", "Oct", "Nov", "Dic"],
    datasets: [{
            label: "Temperatura H",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(225,0,0,0.4)",
            borderColor: "red", // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "#bcc2bd",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            // notice the gap in the data and the spanGaps: true
            data: [23, 24, 26, 27, 22.5, 19.8, 29, 24.7, 21.3, 26.7, 20.9, 21.1],
            spanGaps: true,
        }, {
            label: "Humedad H",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#ffffff",
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            borderColor: "rgb(167, 105, 0)",
            pointHoverBackgroundColor: "#bcc2bd",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointHoverRadius: 8,
            pointRadius: 4,
            pointHitRadius: 10,
            // notice the gap in the data and the spanGaps: false
            data: [40, 44, 42, 29, 60, 67, 68, 66, 67, 45, 57, 44],
            spanGaps: true,
        }, {
            label: "Humedad T",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#ffffff",
            borderColor: "#8fc999",
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointHoverBackgroundColor: "#bcc2bd",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 8,
            pointHitRadius: 10,
            // notice the gap in the data and the spanGaps: false
            data: [20, 28, 60, 90, 60, 70, 90, 80, 70, 56, 48, 89],
            spanGaps: true,
        }, {
            label: "PH",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#ffffff",
            borderColor: "#a2cbe8",
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointHoverBackgroundColor: "#bcc2bd",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 8,
            pointHitRadius: 10,
            // notice the gap in the data and the spanGaps: false
            data: [4, 7, 4.5, 5.8, 6.7, 5.2, 5.7, 6.8, 7.8, 8.2, 6.8, 5.5],
            spanGaps: true,
        }, {
            label: "CO2",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#ffffff",
            borderColor: "#adadaa",
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointHoverBackgroundColor: "#bcc2bd",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 8,
            pointHitRadius: 10,
            // notice the gap in the data and the spanGaps: false
            data: [140, 185, 280, 170, 235, 210, 220, 140, 115, 130, 110, 120],
            spanGaps: true,
        }



    ]
};

// Notice the scaleLabel at the same level as Ticks
var options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            },
            scaleLabel: {
                display: true,
                labelString: 'Variables Climaticas',
                fontSize: 20
            }
        }]
    }
};

// Chart declaration:
var myBarChart = new Chart(ctxs, {
    type: 'line',
    data: data,
    options: options
});