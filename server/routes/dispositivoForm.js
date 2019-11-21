let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Dispositivo = require('./../models/dispositivo');

router.post('/dipositivo/operar', (req, res, next) => {
    console.log(req.body);

    if (req.body._id === "") {
        let dispositivo = new Dispositivo({
            nombre: req.body.nombre,
            modelo: req.body.modelo,
            posicion: req.body.posicion,
        });
        dispositivo.save();
    } else {
        //console.log(req.body._id);
        Dispositivo.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
            if (err) throw err;
        });
    }
    res.redirect('/dispositivo/listar');
});

module.exports = router;