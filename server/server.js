require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');

const app = express();
//const serverr = require('http').Server(app);
//const socketIO = require('socket.io')(serverr);
const flash = require('connect-flash');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');

hbs.registerPartials(path.join(__dirname, "../", "/views/parciales"));

app.set('view engine', 'hbs');
require('./config/local-auth');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/index'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user || null;
    //  console.log(app.locals)
    next();
});

const dispositivoForm = require('./routes/dispositivoForm');
app.use('/dispositivoForm', dispositivoForm);
const parcelaForm = require('./routes/parcelaForm');
app.use('/parcelaForm', parcelaForm);
const personaForm = require('./routes/usuarioForm');
app.use('/usuarioForm', personaForm);
app.use(require('./routes/index'));
var router = require('./routes/parcela');
app.use(require('./routes/usuario'));
app.use(router.router);
app.use(require('./routes/dispositivo'));
app.use(require('./routes/sig'));
const server = app.listen(process.env.PORT, () => {
    console.log('server listening on port: ', 3000);
});

const Data = require('../server/models/data');
console.log("SERVER: " + server);

const io = socketIO(server);
io.of('http://localhost:3000/parcela/ver/5dd8ae53e7793b3a6c241b5e').on('connection', (socket) => {
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
        io.emit('data', data);


    })
});



//require('socket.io');