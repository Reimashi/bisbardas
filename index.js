var express         = require("express");
var app             = express();
var config          = require('./package').config;
var swig            = require('swig');

// Establecemos la configuración de la plantillas Swig.
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', config.debug);
swig.setDefaults({ cache: config.debug });

// Estableciendo las rutas

var router = express.Router();

var homeController = require('./controllers/home-controller');
var authController = require('./controllers/auth-controller');
var userController = require('./controllers/user-controller');
var friendsController = require('./controllers/friends-controller');
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

app.listen(config.port, function() {
  	console.log("Servidor web iniciado (Puerto: " + config.port + ").");
});
