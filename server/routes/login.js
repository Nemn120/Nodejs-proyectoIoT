/*const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const app = express();
const passport = require('passport');



let tokk;
app.get('/login', (req, res) => {
    res.render('login', {

    });


})

app.post('/login', (req, res) => {

    let body = req.body;
    console.log(body.email);
    console.log(body.password);

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }


        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        /*tokk = res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });*/

/*res.status(201).header('token', token).send({
    ok: true,
    usuario: usuarioDB,
    token
});

*/
/*
        res.header('token', token);
        res.redirect("/panel");

    });


});








module.exports = app;