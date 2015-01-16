var swig 		     	= require('swig');
var mongoose 		  = require ('mongoose');
var friendModel 	= require('../models/friend-model')();
var userModel     = require('../models/user-model')();
var i18n 		      = require('i18n');

exports.list = function(req, res) {
  var baseurl = 'http://' + req.headers.host + '/';
  var baseweb = swig.compileFile('views/base.html');
  var pieceUser = swig.compileFile('views/piece-user.html');

  friendModel.list( req.session.user, function(err, usuarios) {
    if (!err){
      var usuariosRenders = Array();

      usuarios.forEach(function(usuario) {
        var opt = Array();

        var state, userinfo;
        if (usuario.user._id == req.session.user._id) {
          state = usuario.userState;
          userinfo = usuario.friend;
        }
        else {
          state = usuario.friendState;
          userinfo = usuario.user;
        }

        if (state == "pending")
        {
          opt.push({
            name: i18n.__('Accept'),
            url: baseurl + 'friends/accept/' + userinfo._id
          });
          opt.push({
            name: i18n.__('Ignore'),
            url: baseurl + 'friends/ignore/' + userinfo._id
          });
        }
        else if (state == "accepted") {
          opt.push({
            name: i18n.__('Ignore'),
            url: baseurl + 'friends/ignore/' + userinfo._id
          });
        }
        else {
          opt.push({
            name: i18n.__('Accept'),
            url: baseurl + 'friends/accept/' + userinfo._id
          });
        }

        usuariosRenders.push(pieceUser({ baseurl: baseurl, user: userinfo, options: opt}));
      });

      res.status(200);
      res.send(baseweb({'content' : usuariosRenders, user: req.session.user, baseurl: baseurl}));
      res.end();
    }
    else { throw err; }
    }
  );
};

// TODO: Añade una peticion de amistad
exports.add = function(req, res) {
  friendModel.findOne().or([{ user: req.param('id'), friend: req.session.user._id }, { user: req.session.user._id, friend: req.param('id') }]).exec(function(err, friend) {
    if (friend == null) {
      var amigo = new friendModel ({
        user:       req.session.user._id,
        friend:     req.param('id'),
        userState:  "accepted",
        friendState:  "pending"
      });
      amigo.save();
    }
    else {
      friend.userState = "accepted";
      friend.save();
    }

    var baseurl = 'http://' + req.headers.host + '/';
    res.redirect(baseurl + 'friends/list');
  });
};

// TODO: Acepta una peticion de amistad
exports.accept = function(req, res) {
  friendModel.findOne().or([{ user: req.param('id'), friend: req.session.user._id }, { user: req.session.user._id, friend: req.param('id') }]).exec(function(err, friend) {
    if (friend == null) {
    }
    else {
      if (friend.user == req.session.user._id) {
        friend.userState = "accepted";
      }
      else {
        friend.friendState = "accepted";
      }
      friend.save();
    }

    var baseurl = 'http://' + req.headers.host + '/';
    res.redirect(baseurl + 'friends/list');
  });
};

// TODO: Ignora un amigo por su id de usuario
exports.ignore = function(req, res) {
  friendModel.findOne().or([{ user: req.param('id'), friend: req.session.user._id }, { user: req.session.user._id, friend: req.param('id') }]).exec(function(err, friend) {
    if (friend == null) {
    }
    else {
      if (friend.user == req.session.user._id) {
        friend.userState = "rejected";
      }
      else {
        friend.friendState = "rejected";
      }
      friend.save();
    }

    var baseurl = 'http://' + req.headers.host + '/';
    res.redirect(baseurl + 'friends/list');
  });
};
