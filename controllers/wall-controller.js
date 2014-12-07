var swig 			= require('swig');
var mongoose 		= require ('mongoose');
var validator 		= require('express-validator');
var i18n 		    = require('i18n');
var url 			= require('url');
var postModel 		= require('../models/post-model')();

//FIXME: Los "...leer completa" no son clickeables (no se puede mandar al get con ellos, por ende)
exports.index = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	var baseurl = 'http://' + req.headers.host + '/';
	var buttonnew = swig.compileFile('views/button-newpost.html');
	var piecepost = swig.compileFile('views/piece-post.html');

	postModel.list(20, 0, function (err, posts) {
		var postsRenders = Array();
		postsRenders.push(buttonnew());
		posts.forEach(function(post) {
			postsRenders.push(piecepost(post));
		});
		res.status(200);
		res.send(baseweb({content: postsRenders}));
		res.end();
	});
}

// Metodo POST, solo redirecciones
exports.addPost = function(req, res) {
	var baseurl = 'http://' + req.headers.host + '/';

	var npost = new postModel(req.body);

	npost.save(function (err) {
		if (err) console.log('Error insertando post.');
		else {
			console.log('Post insertado.');
			res.redirect('../wall');
			res.end();
		}
	});
}

// TODO: Añade un nuevo post (Wall). Imprime el formulario.
// FIXME: Por alguna razon hay un "object Object" por ahi metido
exports.addPostForm = function(req, res) {
	var baseurl = 'http://' + req.headers.host + '/';
	var baseweb = swig.compileFile('views/base.html');
	var piecenewpost = swig.compileFile('views/form-newpost.html');

	piecenewpost();
	console.log('Yendo a formulario de nuevo post.');
	res.status(200);
	res.send(baseweb({content: piecenewpost, baseurl: baseurl}));
	res.end();
}

exports.getPost = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	var piecepost = swig.compileFile('views/piece-post.html');
	var id = req.body.id;

	postModel
	.findOne()
	.where('post._id').equals(id)
	.exec(
		function (err, post) {
			if (err) console.log('Error obteniendo post.');
			else {
				console.log('Tengo tu post.');
				res.status(200);
				res.send(baseweb({content: piecepost(post)}));
				res.end();
			}
		}
	);
}

// TODO: Por probar, echadle un ojo si podeis
exports.deletePost = function(req, res) {
	postModel
	.findByIdAndRemove(req.body.id,
		function (err) {
			if (err) console.log('Error eliminando post.')
				else console.log('Post eliminado.');
			});

		}

// TODO: Pone like a un post desde el usuario actual
exports.addLike = function(req, res) {
}

// TODO: Borra el like del usuario de un post
exports.deleteLike = function(req, res) {
}
