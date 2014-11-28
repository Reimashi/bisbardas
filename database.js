/**
 * Librería que maneja la conexión con la base de datos.
 */

var mongoose = require( 'mongoose' );
var config   = require('./config/database');

var dbURI = 'mongodb://' + config.host +
            ':' + config.port +
            '/' + config.dbname;

exports.connect = function () {
    mongoose.connect(dbURI);
}

exports.disconnect = function (callb) {
    mongoose.connection.close(callb);
}

mongoose.connection.on('connected', function () {
  console.log('INFO (db.js) - Base de datos conectada <' + dbURI + '>');
});

mongoose.connection.on('error',function (err) {
  console.log('ERROR (db.js) - No se ha podido conectar con la base de datos: ' + err);
  setTimeout(function () { exports.connect(); }, config.recontimeout);
});

mongoose.connection.on('disconnected', function () {
  console.log('WARNING (db.js) - La base de datos se ha desconectado.');
});
