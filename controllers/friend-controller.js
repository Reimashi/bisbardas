var swig 			= require('swig');
var mongoose 		= require ('mongoose');
var friendModel 		= require('../models/friend-model')();

// TODO: Genera la pagina del muro (Si usuario logueado)
exports.index = function(req, res) {
  var baseweb = swig.compileFile('views/base.html');
  var piecefriend = swig.compileFile('views/piece-friend.html');

  friendModel.list(20, 0, function (err, posts) {
    var friendsRenders = Array();
    //Renderiza los posts
    friend.forEach(function(post) {
      //Revisar
      friendsRenders.push(piecefriend(post));
    });
    res.status(200);
    //Manda todo
    res.send(baseweb({content: postsRenders}));
    res.end();
  });
}

// TODO: Añade una peticion de amistad
exports.add = function(req, res) {
}

// TODO: Acepta una peticion de amistad
exports.accept = function(req, res) {
}

// TODO: Borra una peticion de amistad
exports.delete = function(req, res) {
}

// TODO: Ignora un amigo por su id de usuario
exports.ignore = function(req, res) {
}
