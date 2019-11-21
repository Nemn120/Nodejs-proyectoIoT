const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const User = require('../models/usuario');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    User.findOne({ 'email': req.body.email }, (err, usuarioDB) => {
        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (usuarioDB) {
            console.log("User:" + usuarioDB);
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
            done(null, newUser);
        }


    });

}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    console.log(email);
    console.log(password);

    User.findOne({ email: email }, (err, usuarioDB) => {
        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return done(null, false, req.flash('signinMessage', 'Usuario No encontrado'));
        }
        if (!usuarioDB.comparePassword(password)) {
            return done(null, false, req.flash('signinMessage', 'Password incorrecto'));
        }
        return done(null, usuarioDB);



    });

}));