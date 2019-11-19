const mongoose = require('../config/conexion');
const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const sig = require('./sig.js');
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();




router.get('/usuario/nuevo', (req, res) => {
    res.render('admregister', {});
})

router.get('/usuario/listar', (req, res, next) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 10;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.render('usuarios', { usuarios: usuarios });
        });
    /*}
    res.redirect('/');
    */

});
router.post('/usuario/nuevo', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {

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

router.get('/usuario/modificar/:id', function(req, res, next) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, persona) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.render("usuarioForm", { persona: persona });
    })

});

router.get('/usuario/eliminar/:id', function(req, res) {
    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    let cambiaEstado = {
        estado: false
    };
    Usuario.remove({ _id: id }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.redirect('/usuario/listar');

    });



});



module.exports = router;