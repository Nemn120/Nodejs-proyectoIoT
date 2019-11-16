let counter = 0;
const socket = io();


var ctx = document.getElementById('myChart').getContext('2d');
var ctxs = document.getElementById('myCharts').getContext('2d');
var chartTemp = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Serial"],
        datasets: [{
            label: "Serial",
            backgroundColor: 'rgb(155, 212, 185)',
            borderColor: 'rgb(41,128,185)',
            data: [] //datos
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
var chartHumed = new Chart(ctxs, {
    type: 'line',
    data: {
        labels: ["Serial"],
        datasets: [{
            label: "Serial",
            backgroundColor: 'rgb(221, 230, 218)',
            borderColor: 'rgb(41,128,185)',
            data: [] //datos
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});



socket.on('data', function(data) {
    console.log(data);

    let tempp = data.Temperatura;
    let humedd = data.Humedad;
    let temp = document.getElementById('temperature').innerHTML = `Temperatura: ${tempp} °C`;
    let humed = document.getElementById('humedad').innerHTML = `Humedad: ${humedd}  % `;
    chartTemp.data.labels.push(counter);
    chartHumed.data.labels.push(counter);

    chartTemp.data.datasets.forEach(dataset => {
        dataset.data.push(tempp);


    });
    chartHumed.data.datasets.forEach(dataset => {
        dataset.data.push(humedd);
    })
    counter++;
    chartTemp.update();
    chartHumed.update();

});