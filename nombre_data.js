const { PythonShell } = require("python-shell");


var express = require('express');
var path = require('path');
var app = express();

/*
let pyshell = new PythonShell('test.py');
PythonShell.run('prueba4.py', null, function (err, results) {
    if (err) throw err;
    console.log('Dato obtenido de Python', results);
    console.log('finished');
  });
  */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


var options = {
    scriptPath: './'
};

var pyshell = new PythonShell('Analisis.py', options, {
    mode: 'text'
});

var usuario_data = ["datas"]; // Nombre de la coleccion de un usuario
pyshell.send(JSON.stringify(usuario_data)); //Se envia a python el nombre de la data del usuario

var productos;
pyshell.on('message', function(message) {
    console.log(message); // Recibe el resultado final
    productos = message.split(',');
});

pyshell.end(function(err) {
    if (err) {
        throw err;
    };
    //console.log('finished');
});

app.get('/', function(req, res) {
    res.render('index', {
        productos: productos
    });
});



app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});