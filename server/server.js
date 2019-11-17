require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const socketIO = require('socket.io');
const app = express();
const flash = require('connect-flash');
var path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
hbs.registerPartials(path.join(__dirname, "../", "/views/parciales"));

app.set('view engine', 'hbs');
require('./config/local-auth');

//app.engine('ejs', engine);
//app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(__dirname));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// Configuración global de rutas
//app.use(require('./config/local-auth'));
app.use(require('./routes/index'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    console.log(app.locals)
    next();
});

app.use('/', require('./routes/sig'));
// conectando a la bd
mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});


/*app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
*/

const server = app.listen(process.env.PORT, () => {
    console.log('server listening on port: ', 3000);
});


const io = socketIO(server);
const Data = require('../server/models/data');
io.on('connection', (socket) => {
    console.log('Nueva cioneccion sokec id: ', socket.id);
    socket.on('disconnect', (socket) => {
        console.log('el socket se ha desconectado', socket.id);

    })

    socket.on('connection', (data) => {
        console.log(data);
    })
    socket.on('atime', (data) => {
        console.log(data);
    });

    socket.on('JSON', (data) => {
        console.log(data);
        let dataIoT = new Data({
            Temperatura: data.Temperatura,
            HumedadAire: data.HumedadH,
            HumedadTierra: data.HumedadT,
            Ph: data.Ph,
            CO2: data.CO2

        });
        dataIoT.save((err, usuarioDB) => {

            if (err) {
                console.log("Error");
            }
        });



    })
});
//require('socket.io');