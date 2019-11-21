const express = require('express');
const mongoose = require('../config/conexion');
const router = require('express').Router();
const _ = require('underscore');
const Parcela = require('../models/parcela');


const app = express();

router.get('/parcela/nuevo', (req, res, next) => {
    res.render('parcelaForm', {});
});

router.get('/parcela/listar', (req, res, next) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 10;
    limite = Number(limite);
    Parcela.find()
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
    /*}
    res.redirect('/');
    */
});
router.post('/parcela/nuevo', function(req, res) {
    let body = req.body;
    let parcela = new Usuario({
        nombre: body.direccion,
        apellido: body.largo,
        email: body.ancho,
    });
    parcela.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        /* res.json({
             ok: true,
             usuario: usuarioDB
         });
         */
        res.redirect("listar");
    });
});

router.get('/parcela/modificar/:id', function(req, res, next) {

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

router.get('/parcela/eliminar/:id', function(req, res) {
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

module.exports = router;