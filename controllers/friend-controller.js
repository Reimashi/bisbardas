var swig 		     	= require('swig');
var mongoose 		  = require ('mongoose');
var friendModel 	= require('../models/friend-model')();
var userModel     = require('../models/user-model')();

var sampleUser = new userModel({
  email:      'adri@gmail.com',
  name:       'adri',
  password:   'adri',
});

// TODO: Genera la pagina del muro (Si usuario logueado)
exports.index = function(req, res) {
  var baseweb = swig.compileFile('views/base.html');
  var pieceFriend = swig.compileFile('views/piece-friend.html');

  var listRes;
  friendModel.list(sampleUser,function (err, friends) {
    console.log("amigos: " + friends);
    listRes = Array();
    friends.forEach(function(friend) {
      listRes.push(pieceFriend(friend));
      console.log("listado: " + pieceFriend);
    });

    console.log("listado: " + listRes);
    res.status(200);
    res.send(baseweb({'content' : listRes}));
    res.end();
  });
};

exports.users = function(req, res) {
  var baseweb = swig.compileFile('views/base.html');
  var pieceFriend = swig.compileFile('views/piece-friend.html');

  var usuariosRenders = Array();
  userModel.find({}, function(err, usuarios) {
    if (!err){
      usuarios.forEach(function(usuario) {
        if(!usuario._id.equals(req.session.user._id)){
          console.log(usuario);
          usuariosRenders.push(pieceFriend(usuario));
        }
      });
      res.status(200);
      res.send(baseweb({'content' : usuariosRenders}));
      res.end();
    }
    else { throw err;}
    }
  );
};

// TODO: Añade una peticion de amistad
exports.add = function(req, res) {
  var amigo = new friendModel ({
    user:       req.session.user,
    friend:     sampleUser,
    acepted:    false
  });
  amigo.save();
};

// TODO: Acepta una peticion de amistad
exports.accept = function(req, res) {
  friendModel.find({
    user:       req.session.user,
    friend:     sampleUser,
    acepted:    false
  }).accept();
};

// TODO: Borra una peticion de amistad
exports.delete = function(req, res) {
  friendModel.remove({
    user:       req.session.user,
    friend:     sampleUser,
  }, function(err) {
    if (err) {
      message.type = 'Error al eliminar amistad';
    }
  });
};

// TODO: Ignora un amigo por su id de usuario
exports.ignore = function(req, res) {
  friendModel.find({
    user:       req.session.user,
    friend:     sampleUser,
  }).ignore();
};
