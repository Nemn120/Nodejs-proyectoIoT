let counter = 0;
const socket = io();


var grafico = new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: ["Serial"],
        datasets: [{
            data1: [],
            label: "Temperatura H",
            borderColor: "#3e95cd",
            fill: false
        }, {
            data2: [],
            label: "Humedad H",
            borderColor: "#8e5ea2",
            fill: false
        }, {
            data3: [],
            label: "Humedad T",
            borderColor: "#3cba9f",
            fill: false
        }, {
            data4: [],
            label: "",
            borderColor: "#e8c3b9",
            fill: false
        }, {
            data5: [],
            label: "Serial",
            borderColor: "#c45850",
            fill: false
        }]
    },
    options: {
        title: {
            display: true,
            text: 'World population per region (in millions)'
        }
    }
});


socket.on('data', function(data) {


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