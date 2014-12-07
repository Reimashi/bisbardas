var swig 		     	= require('swig');
var mongoose 		  = require ('mongoose');
var friendModel 	= require('../models/friend-model')();
var userModel     =require('../models/user-model')();

// TODO: Genera la pagina del muro (Si usuario logueado)
exports.index = function(req, res) {
  var baseweb = swig.compileFile('views/base.html');
  var piecefriend = swig.compileFile('views/piece-friend.html');

  var viewparams = {
    'content': [piecefriend()]
  };
  console.log("Prueba");
  console.log(req);
  //console.log(friendModel.list(userModel,1));
  res.status(200);
  res.send(baseweb(viewparams));
  res.end();
};

// TODO: Añade una peticion de amistad
exports.add = function(req, res) {
};

// TODO: Acepta una peticion de amistad
exports.accept = function(req, res) {
};

// TODO: Borra una peticion de amistad
exports.delete = function(req, res) {
};

// TODO: Ignora un amigo por su id de usuario
exports.ignore = function(req, res) {
};
