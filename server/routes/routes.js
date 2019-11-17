const express = require('express');
const app = express();




/*app.get('/', (req, res) => {
    res.render('home', {
        anio: new Date().getFullYear()
    });

});
*/
app.get('/about', (req, res) => {
    res.render('about', {
        anio: new Date().getFullYear()
    });

});
app.get('/services', (req, res) => {
    res.render('services', {
        anio: new Date().getFullYear()
    });

});


module.exports = app;