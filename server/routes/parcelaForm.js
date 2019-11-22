let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Parcela = require('./../models/parcela');
const { isAuthenticated } = require('../helpers/auth');
router.post('/parcela/operar', isAuthenticated, (req, res, next) => {
    console.log(req.body);

    if (req.body._id === "") {
        let parcela = new Parcela({
            direccion: req.body.direccion,
            largo: req.body.largo,
            ancho: req.body.ancho,
            user: req.user._id
        });
        console.log(req.user._id);

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