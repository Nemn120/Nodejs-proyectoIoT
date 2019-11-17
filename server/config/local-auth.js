const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const User = require('../models/usuario');

passport.serializeUser((user, done) => {
    done(null, user.id);
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
            return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));

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

    //try {const user = await
    User.findOne({ email: email }, (err, usuarioDB) => {
        console.log(usuarioDB.email);
        console.log(usuarioDB.password);
        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return done(null, false, req.flash('signinMessage', 'No User Found'));
        }
        if (!usuarioDB.comparePassword(password)) {
            return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
        }
        return done(null, usuarioDB);



    });


    // } catch (e) {
    //  console.log('Error happend while connecting to the DB: ', e.message)
    //}
}));