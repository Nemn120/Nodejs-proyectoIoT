const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cultivoSchema = new Schema({

    nombre: {
        type: String,

    }


});

// manda los datos a schema usuario
module.exports = mongoose.model('cultivo', cultivoSchema);