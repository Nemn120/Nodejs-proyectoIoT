const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dataSchema = new Schema({

    Temperatura: Number,
    HumedadAire: Number,
    HumedadTierra: Number,
    Ph: Number,
    CO2: Number,
    date: { type: Date, default: Date.now },
    usuario: { type: String, required: true },

    //current_date: new Date()
});

// manda los datos a schema usuario
module.exports = mongoose.model('Data', dataSchema);