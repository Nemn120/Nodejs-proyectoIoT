const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');
const User = require('../models/usuario');
router.get('/', (req, res, next) => {
    res.render('home');
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/parcela/listar',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/register', (req, res, next) => {
    res.render('register');
});


router.post('/register', async(req, res) => {
    User.findOne({ email: req.body.email }, (err, usuarioDB) => {
        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (usuarioDB) {
            return done(null, false, req.flash('signupMessage', 'El email ya esta en uso.'));

        } else {
            const newUser = new User();
            newUser.nombre = req.body.nombre;
            newUser.email = req.body.email;
            console.log("EMAIL: " + email);
            newUser.password = newUser.encryptPassword(password);
            console.log("USuario nuevo" + newUser);
            newUser.save((err, usuarioDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
            });
            res.redirect('/');
            // done(null, newUser);
        }


    });

});


router.get('/panel', isAuthenticated, (req, res, next) => {
    console.log("IDDD: " + req.params.id);


    res.render('panel');
});
/*
router.get('/usuario/listar', isAuthenticated, (req, res, next) => {
    console.log("IDDD: " + req.params.id);


    res.render('usuarios');
});
*/

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;