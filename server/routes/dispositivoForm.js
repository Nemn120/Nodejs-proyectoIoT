let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Dispositivo = require('./../models/dispositivo');
const { isAuthenticated } = require('../helpers/auth');
let Parcela = require('./../models/parcela');

router.post('/dipositivo/operar', isAuthenticated, (req, res, next) => {
    let parcelId = req.body.idParcela;

    if (req.body._id === "") {
        let dispositivo = new Dispositivo({
            nombre: req.body.nombre,
            modelo: req.body.modelo,
            posicion: req.body.posicion,


            parcela: parcelId

        });
        Parcela.findByIdAndUpdate(parcelId, { $push: { "dispositivos": dispositivo } }, { safe: true, upsert: true },
            function(err, model) {
                if (err) {
                    //console.log(err);
                    return res.send(err);
                }
            });
        dispositivo.save();
    } else {
        //console.log(req.body._id);
        Dispositivo.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
            if (err) throw err;
        });
    }
    res.redirect('/parcela/ver/' + parcelId);
});

module.exports = router;