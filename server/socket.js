const io = socketIO(server);
const Data = require('../server/models/data');

module.exports = function(io) {
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
            io.emit('data', data);


        })
    });
}