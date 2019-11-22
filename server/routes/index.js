const express = require('express');

const app = express();






//app.use(require('./login'));
//app.use(require('./panel'));
//app.use(require('./register'));
app.use(require('./routes'));
//app.use(require('/sig'));



module.exports = app;