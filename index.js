var express         = require('express');
var path            = require('path');
var swig            = require('swig');
var bodyParser      = require('body-parser');


var app             = express();
var config          = require('./package').config;
var db              = require('./db');

// Establecemos la configuración de la plantillas Swig.
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', !config.debug);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
swig.setDefaults({ cache: config.debug ? false : 'memory' });

// Estableciendo las rutas
var router = express.Router();

var homeController = require('./controllers/home-controller');
var authController = require('./controllers/auth-controller');
var userController = require('./controllers/user-controller');
var friendController = require('./controllers/friend-controller');
var wallController = require('./controllers/wall-controller');

router.route('/')
	.get(homeController.index);

router.route('/auth')
	.get(authController.login)
	.post(authController.login);

router.route('/auth/logout')
	.get(authController.logout);

router.route('/user/:id')
	.get(userController.index)
	.post(userController.add);

router.route('/user/:id/modify')
	.get(userController.modify);

router.route('/user/:id/delete')
	.get(userController.delete);

router.route('/friends')
	.get(friendController.index)
	.post(friendController.add);

router.route('/friends/:id/accept')
	.get(friendController.accept);

router.route('/friends/:id/ignore')
	.get(friendController.ignore);

router.route('/friends/:id/delete')
	.get(friendController.delete);

router.route('/wall')
	.get(wallController.index)
	.post(wallController.addPost);

router.route('/wall/:id')
	.get(wallController.getPost);

router.route('/wall/:id/delete')
	.get(wallController.deletePost);

app.use(router);

// Establecemos la carpeta de archivos estaticos
app.use('/static', express.static(path.join(__dirname, 'public')));

// Conectamos con la base de datos
db.connect();

// Iniciamos el servidor
app.listen(config.port, function() {
	console.log("INFO (index.js) - Servidor web iniciado (Puerto: " + config.port + ").");
});

process.on('SIGINT', function() {
	console.log("INFO (index.js) - Apagando servidor web...");
	db.disconnect();
	process.exit(0);
});
