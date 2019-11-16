require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const socketIO = require('socket.io');
const app = express();
var path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, "../", "/views/parciales"));

app.set('view engine', 'hbs');


app.use(express.static(__dirname));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Configuración global de rutas
app.use(require('./routes/index'));
// conectando a la bd
mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});



/*app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
*/

const server = app.listen(process.env.PORT, () => {
    console.log('server listening on port: ', 3000);
});


const io = socketIO(server);
const Data = require('../server/models/data');
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
        console.log(data);
        let dataIoT = new Data({
            Temperatura: data.Temperatura,
            HumedadAire: data.HumedadH,
            HumedadTierra: data.HumedadT,
            Ph: data.Ph,
            CO2: data.CO2

        });
        dataIoT.save((err, usuarioDB) => {

            if (err) {
                console.log("Error");
            }
        });



    })
});
//require('socket.io');