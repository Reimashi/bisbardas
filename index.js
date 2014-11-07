var express         = require("express");
var app             = express();
var config          = require('./package').config;

app.set('views', path.join(__dirname, 'views'));

// Estableciendo las rutas

var router = express.Router();

var performanceController = require('./controllers/wall');

router.route('/')
	.get(/* controlador */);

app.use(router);

app.listen(config.port, function() {
  	console.log("Servidor web iniciado (Puerto: " + config.port + ").");
});
