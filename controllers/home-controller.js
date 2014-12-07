var swig            = require('swig');
var userController  = require('./user-controller');

// Genera la pagina de inicio
exports.index = function(req, res) {
    userController.addGet(req, res);
}
