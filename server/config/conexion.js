// conectando a la bd
const mongoose = require('mongoose');

function BDFactory() {
    this.conectarse = function() {
        if (process.env.NODE_ENV === 'prod') {

            console.log("BASE DATOS: PRODUCCION");
            return process.env.MONGO_URI;
        } else {

            console.log("BASE DATOS: DESARROLLO");
            return 'mongodb://localhost:27017/cafe';
        }

    }
}


var factory = new BDFactory();
process.env.URLDB = factory.conectarse();
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');

});