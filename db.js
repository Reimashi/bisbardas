/**
 * Librería que maneja la conexión con la base de datos.
 */

var mongoose = require( 'mongoose' );
var config   = require('./package').config;

var dbURI = 'mongodb://' + config.database.host +
            ':' + config.database.port +
            '/' + config.database.dbname;

mongoose.connection.on('connected', function () {
  console.log('INFO (db.js) - Base de datos conectada <' + dbURI + '>');
});

mongoose.connection.on('error',function (err) {
  console.log('ERROR (db.js) - No se ha podido conectar con la base de datos: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('WARNING (db.js) - La base de datos se ha desconectado.');
});

exports.connect = function () {
  mongoose.connect(dbURI);
}

exports.disconnect = function (callb) {
  mongoose.connection.close(callb);
}
