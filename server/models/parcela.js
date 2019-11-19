const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const parcelaSchema = new Schema({

    direccion: {
        type: String,
    },
    largo: { type: String },
    ancho: { type: String },
    dispositivo: [{
        type: Schema.Types.ObjectId,
        ref: "dispositivo"
    }],



});

// manda los datos a schema usuario
module.exports = mongoose.model('Parcela', parcelaSchema);