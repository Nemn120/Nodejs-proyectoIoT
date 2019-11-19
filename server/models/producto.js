const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productoSchema = new Schema({
    nombre: String,
    Temperatura: Number,
    HumedadAire: Number,
    HumedadTierra: Number,
    Ph: Number,
    CO2: Number,


});

// manda los datos a schema usuario
module.exports = mongoose.model('Producto', productoSchema);