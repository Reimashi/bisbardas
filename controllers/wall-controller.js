var swig 			= require('swig');
var mongoose 		= require ('mongoose');
var postModel 		= require('../models/post-model')();



//FIXME: Los "...leer completa" no son clickeables (no se puede mandar al get con ellos, por ende)
exports.index = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	var buttonnew = swig.compileFile('views/button-newpost.html');
	var piecepost = swig.compileFile('views/piece-post.html');


	postModel.list(20, 0, function (err, posts) {
		var postsRenders = Array();
		postsRenders.push(buttonnew());
		posts.forEach(function(post) {
			postsRenders.push(piecepost(post));
		});
		res.status(200);
		//Manda todo
		res.send(baseweb({content: postsRenders}));


		res.end();
	});
}

/*
 *	Todos los /post tienen error en el CSS. Cannot GET /post/static/css/common.css
 */



// FIXME: Hacer un redirect tras meter el post, formatear mensaje bien
exports.addPost = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	var npost = new postModel(req.body);
	npost.save(function (err) {
		if (err) return new Error(err);
		else {
			res.status(200);
			res.redirect(200, '../wall');
			res.end();
		}
	});


}

// FIXME: Por alguna razon hay un "object Object" por ahi metido
exports.addPostForm = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	var piecenewpost = swig.compileFile('views/piece-newpost.html');
	piecenewpost();
	res.status(200);
	res.send(baseweb({content: piecenewpost}));
	res.end();
}

// TODO: Obtiene un post en concreto
exports.getPost = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	var piecepost = swig.compileFile('views/piece-post.html');
	var id = req.body.id;

	postModel
	.findOne()
	.where('post._id').equals(id)
	.exec(
		function (err, post) {
			if (err) return handleError(err);
			else {
				console.log('Tengo tu post');
				res.status(200);
				res.send(baseweb({content: piecepost(post)}));
				res.end();
			}
		}
	);
}

// TODO: Borra el post pasado como parametro
exports.deletePost = function(req, res) {

	var npost = new postModel(req.body);
	//npost.findOne().where('post._id').equals(id).exec(function (err, post) {if (err) return handleError(err);else {res.send("Post eliminado.");}});
	npost.remove(function (err) {
		if (err) return handleError(err);
		else res.send("Post eliminado");
	});
}

// Faltan los likes
