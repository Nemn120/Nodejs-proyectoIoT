const express = require('express');
const mongoose = require('../config/conexion');
const router = require('express').Router();
const _ = require('underscore');
const Dispositivo = require('../models/dispositivo');


const app = express();

router.get('/dispositivo/nuevo', (req, res, next) => {
    res.render('dispositivoForm', {});
});

router.get('/dispositivo/listar', (req, res, next) => {
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
router.post('/dispositivo/nuevo', function(req, res) {
    let body = req.body;
    let dispositivo = new Dispositivo({
        nombre: body.nombre,
        modelo: body.modelo,
        posicion: body.posicion,
    });
    dispositivo.save((err, dispositivo) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        /* res.json({
             ok: true,
             dispositivo: dispositivo
         });
         */
        res.redirect("listar");
    });
});

router.get('/dispositivo/modificar/:id', function(req, res, next) {

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

router.get('/dispositivo/eliminar/:id', function(req, res) {
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