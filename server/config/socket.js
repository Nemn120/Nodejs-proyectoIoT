/*const express = require('express');
const socketIO = require('socket.io');
const app = express();
// ruta de la bd
const Data = require('../models/data');

const server = app.listen(app.get('port'), () => {
    console.log('server listening on port: ', 3000);
});

const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('Nueva cioneccion sokec id: ', socket.id);
    socket.on('disconnect', (socket) => {
        console.log('el socket se ha desconectado', socket.id);

    })

    socket.on('connection', (data) => {
        console.log(data);
    })
    socket.on('atime', (data) => {
        console.log(data);
    });

    socket.on('JSON', (data) => {
        let dataIoT = new Data({
            Temperatura: data.Temperatura,
            HumedadAire: data.HumedadAire,
            HumedadTierra: data.HumedadAire,
            Ph: data.Ph,
            CO2: data.CO2

        });
        dataIoT.save((err, usuarioDB) => {

            if (err) {
                console.log("Error");
            }
        });
        console.log(data);


    })
});