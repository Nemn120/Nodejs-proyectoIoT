const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dispositivoSchema = new Schema({

    nombre: {
        type: String,
    },
    modelo: {
        type: String,
    },
    posicion: String,
    data: [{
        type: Schema.Types.ObjectId,
        ref: "data"
    }],


});

// manda los datos a schema usuario
module.exports = mongoose.model('Dispositivo', dispositivoSchema);