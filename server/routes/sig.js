const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('home');
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/panel',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/register', (req, res, next) => {
    console.log("register HGsd");
    res.render('register');
});


router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/panel',
    failureRedirect: '/register',
    failureFlash: true
}));

router.get('/panel', isAuthenticated, (req, res, next) => {
    res.render('panel');
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/')
}

module.exports = router;