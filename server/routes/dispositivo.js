const express = require('express');
const mongoose = require('../config/conexion');
const router = require('express').Router();
const _ = require('underscore');
const Dispositivo = require('../models/dispositivo');
const { isAuthenticated } = require('../helpers/auth');

const app = express();

router.get('/dispositivo/nuevo/:id', isAuthenticated, (req, res, next) => {
    console.log("REQ__________PARAMS " + req.params.id);
    idParcela = req.params.id;
    res.render('dispositivoForm', { idParcela });
});

router.get('/dispositivo/listar', isAuthenticated, (req, res, next) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 10;
    limite = Number(limite);
    Dispositivo.find()
        .skip(desde)
        .limit(limite)
        .exec((err, dispositivos) => {



            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.render('dispositivo', { dispositivos: dispositivos });
        });
    /*}
    res.redirect('/');
    */
});

router.get('/dispositivo/modificar/:id', isAuthenticated, function(req, res, next) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'modelo', 'posicion']);

    Dispositivo.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, dispositivo) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.render("dispositivoForm", { dispositivo: dispositivo });
    })
});

router.get('/dispositivo/eliminar/:id', isAuthenticated, function(req, res) {
    let id = req.params.id;
    Dispositivo.remove({ _id: id }, (err, dispositivoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!dispositivoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Dispositivo no encontrado'
                }
            });
        }
        res.redirect('/dispositivo/listar');
    });
});

module.exports = router;