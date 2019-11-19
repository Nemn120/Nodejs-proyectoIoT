// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;
// ============================
//  Entorno
// ============================
process.env.NODESRO = process.env.NODESRO || 'desarrollo';
// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.NODE_ENV;
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
// ============================
//  SEED de autenticación
// ============================
process.env.TOKEN;
// ============================
//  Base de datos
// ============================
/*
let urlDB;

if (process.env.NODE_ENV === 'prod') {
    urlDB = process.env.MONGO_URI;
    console.log("PRODUCCION");

} else {

    urlDB = 'mongodb://localhost:27017/cafe';
    console.log("DESARROLLO");
    //urlDB = 'mongodb+srv://user:4ozvRkeatvDCUfPf@cluster0-tzeao.mongodb.net/cafe?retryWrites=true&w=majority';

}

process.env.URLDB = urlDB;
*/