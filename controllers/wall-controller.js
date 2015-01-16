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

	var newform = swig.compileFile('views/form-newpost.html');
	var piecepost = swig.compileFile('views/piece-post.html');

	var postsRenders = Array();
	postsRenders.push(newform());

	postModel.list(req.session.user, 20, 0, function (err, posts) {
		posts.forEach(function(post) {
			postsRenders.push(piecepost({baseurl: baseurl, info: post}));
		});

		res.status(200);
		res.send(baseweb({baseurl: baseurl, content: postsRenders, user: req.session.user}));
		res.end();
	});
};

// Metodo POST, solo redirecciones
exports.addPost = function(req, res) {
	var baseurl = 'http://' + req.headers.host + '/';

	var npost = new postModel({
		title: req.param('post-title'),
		body: req.param('post-body'),
		author: req.session.user._id
	});

	npost.save(function (err) {
		if (err) console.log('Error insertando post.');
		else {
			console.log('Post insertado.');
			res.redirect('../wall');
			res.end();
		}
	});
};

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
};

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
};

// Elimina una entrada en modo asincrono
exports.deletePost = function(req, res) {
	var baseurl = 'http://' + req.headers.host + '/';
	var baseweb = swig.compileFile('views/base.html');
	var piecenewpost = swig.compileFile('views/form-newpost.html');
	postModel.findOne({ _id: req.param('id') }, function (err, post) {
			if (err) res.status(404).end();
			else {
				if (post.author == req.session.user._id) {
					postModel.findOne({ _id: req.param('id') }).remove(function(err, post) {
						if (err) res.status(500).end();
						res.status(200).end;
					});
				}
				else {
					res.status(401).end();
				}
			}
			res.send(baseweb({content: piecenewpost, baseurl: baseurl}));
			res.end();
	});
};

// Añade un like en modo asincrono
exports.addLike = function(req, res) {
	console.log('AddLike');
	var baseurl = 'http://' + req.headers.host + '/';
	var baseweb = swig.compileFile('views/base.html');
	var piecenewpost = swig.compileFile('views/form-newpost.html');
	postModel.findOne({_id: req.param('id')}, function (err, post) {
		if (err) res.status(404).end();
		else {
			post.deleteLike(req.session.user, function (err) {
				if (err) res.status(401).end();
				else {
					res.status(200).end();
				}
			});
		}
		res.send(baseweb({content: piecenewpost, baseurl: baseurl}));
		res.end();
	});
};

// Borra un like en modo asíncrono.
exports.deleteLike = function(req, res) {
	console.log('DelLike');
	var baseurl = 'http://' + req.headers.host + '/';
	var baseweb = swig.compileFile('views/base.html');
	var piecenewpost = swig.compileFile('views/form-newpost.html');
	postModel.findOne({_id: req.param('id')}, function (err, post) {
		if (err) res.status(404).end();
		else {
			post.deleteLike(req.session.user, function (err) {
				if (err) res.status(401).end();
				else {
					res.status(200).end();
				}
			});
		}
		res.send(baseweb({content: piecenewpost, baseurl: baseurl}));
		res.end();
	});
};
