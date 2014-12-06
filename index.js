var express         = require('express');
var passport 		= require('passport');
var path            = require('path');

var app             = express();
var config          = require('./config/server');
var db              = require('./database');

// Establecemos la configuración de passport
require('./config/passport')(passport);

// Establecemos la configuración de la plantillas Swig.
require('./config/swig')(app);

// Establecemos la configuración del modulo de traducción.
require('./config/i18n')(app);

// Estableciendo las rutas
var router = express.Router();
require('./config/routes')(router);
app.use(router);

// Establecemos la carpeta de archivos estaticos
app.use('/static', express.static(path.join(__dirname, 'public')));

// Conectamos con la base de datos
db.connect();

// Iniciamos el servidor
app.listen(config.port, function() {
	console.log("INFO (index.js) - Servidor web iniciado (Puerto: " + config.port + ").");
});

// Handler para apagar el servidor correctamente
process.on('SIGINT', function() {
	console.log("INFO (index.js) - Apagando servidor web...");
	db.disconnect();
	process.exit(0);
});
