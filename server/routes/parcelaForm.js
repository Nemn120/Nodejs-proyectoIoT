let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Parcela = require('./../models/parcela');
const Usuario = require('../models/usuario');
const { isAuthenticated } = require('../helpers/auth');
router.post('/parcela/operar', isAuthenticated, (req, res, next) => {

    let id = req.user._id;
    if (req.body._id === "") {
        let parcela = new Parcela({
            direccion: req.body.direccion,
            largo: req.body.largo,
            ancho: req.body.ancho,
            user: id
        });
        //  Usuario.findByIdAndUpdate({ _id: id }, { $push: { parcela: parcela } }, done);
        Usuario.findByIdAndUpdate(id, { $push: { "parcelas": parcela } }, { safe: true, upsert: true },
            function(err, model) {
                if (err) {
                    //console.log(err);
                    return res.send(err);
                }
            });

        parcela.save();
    } else {
        //console.log(req.body._id);
        Parcela.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
            if (err) throw err;
        });
    }
    res.redirect('/parcela/listar');
});

module.exports = router;