const express = require('express');
const mongoose = require('../config/conexion');
const router = require('express').Router();
const _ = require('underscore');
const Parcela = require('../models/parcela');
const Usuario = require('../models/usuario');
const { isAuthenticated } = require('../helpers/auth');
const Dispositivo = require('../models/dispositivo');
const app = express();
var parcelId;
router.get('/parcela/nuevo', isAuthenticated, (req, res, next) => {
    res.render('parcelaForm', {});
});

router.get('/parcela/listar', isAuthenticated, (req, res, next) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 10;
    limite = Number(limite);
    Parcela.find({ user: req.user._id })
        .skip(desde)
        .limit(limite)
        .exec((err, parcelas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.render('parcela', { parcelas: parcelas });
        });
});

router.get('/parcela/ver/:id', isAuthenticated, function(req, res, next) {

    parcelId = req.params.id;
    let body = _.pick(req.body, ['direccion', 'largo', 'ancho']);

    Parcela.findByIdAndUpdate(parcelId, body, { new: true, runValidators: true }, (err, parcela) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //var dispositivoArray = Parcela.find('dispositivos');
        //console.log(dispositivoArray);

        console.log("TIPO DATO" + typeof(parcela.dispositivos));
        //var arrayDispositivos =
        Dispositivo.find({ parcela: parcela._id }, (err, dispositivo) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.render("verParcela", { parcela: parcela, dispositivo: dispositivo });


        })




    })
});

router.get('/parcela/modificar/:id', isAuthenticated, function(req, res, next) {

    let id = req.params.id;
    let body = _.pick(req.body, ['direccion', 'largo', 'ancho']);

    Parcela.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, parcela) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.render("parcelaForm", { parcela: parcela });
    })
});

router.get('/parcela/eliminar/:id', isAuthenticated, function(req, res) {
    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Parcela.remove({ _id: id }, (err, parcelaborrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!parcelaborrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.redirect('/parcela/listar');
    });
});

module.exports = {
        router,
        parcelId
    }
    //  ;
    //module.exports.parcelId = parcelId;