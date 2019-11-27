let counter = 0;
const socket = io.connect('http://localhost:3000/parcela/ver/5dd8ae53e7793b3a6c241b5e');

var ctx = document.getElementById('myChartLine').getContext('2d');
//var ctxs = document.getElementById("line-chart").getContext('2d');



grafico = new Chart(ctx, {
    type: 'line',
    data: {
        //labels: ["Serial"],
        labels: ["En", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agost", "Sep", "Oct", "Nov", "Dic"],
        datasets: [{
            data: [28, 22, 23.5, 24],
            label: "Temperatura H",
            borderColor: "#3e95cd",
            fill: false
        }, {
            data: [70, 60, 70, 70],
            label: "Humedad H",
            borderColor: "#8e5ea2",
            fill: false
        }, {
            data: [20, 50, 10, 50, 55],
            label: "Humedad T",
            borderColor: "#3cba9f",
            fill: false
        }, {
            data: [5, 1, 4, 3.9, 5.9],
            label: "PH",
            borderColor: "#e8c3b9",
            fill: false
        }, {
            data: [300, 200, 300, 215, 100],
            label: "CO2",
            borderColor: "#c45850",
            fill: false
        }]
    },
    options: {
        title: {
            display: true,
            text: "Datos obtenidos por los sensores en tiempo real"
        }
    }
});

/*socket.on('data', function(data) {
    console.log("TEMPERATURA: " + data.Temperatura);

    grafico.data.labels.push(counter);
    grafico.data.datasets.forEach(dataset => {
        dataset.data1.push(data.Temperatura);
        dataset.data2.push(data.HumedadH);
        dataset.data3.push(data.HumedadT);
        dataset.data4.push(data.Ph);
        dataset.data5.push(data.CO2);

    });
    counter++;
    grafico.update();

});

*/