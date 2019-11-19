let express = require('express');
let router = express.Router();

let Persona = require('../models/usuario');

router.post('/usuario/operar', (req, res, next) => {

    console.log("BODY: " + req.body._id);
    console.log("NOMBRE: " + req.body.nombre);

    if (req.body._id == "") {
        let per = new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
            apellido: req.body.apellido
                // edad: req.body.edad
        });

        per.save();
    } else {
        //console.log(req.body._id);
        Persona.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
            if (err) throw err;
        });
    }
    res.redirect('/usuario/listar');
});

module.exports = router;