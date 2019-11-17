/*const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
app.use(require('./login'));


app.get('/panel', verificaToken, (req, res) => {
    res.render('panel', {
        anio: new Date().getFullYear()
    });

});

module.exports = app;