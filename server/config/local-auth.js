const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const User = require('../models/usuario');

passport.serializeUser((user, done) => {
    console.log("IDDDDDDDDD" + user._id);
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        console.log("ID : " + id);
        console.log("ID user : " + user._id);
        done(null, user);

    });

});



passport.use(new LocalStrategy({
    usernameField: 'email',

}, async(email, password, done) => {


    User.findOne({ email: email }, (err, usuarioDB) => {
        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }
        if (!(usuarioDB.comparePassword(password))) {
            return done(null, false, req.flash('signinMessage', 'Password incorrecto'));
        }
        return done(null, usuarioDB);



    });

}));