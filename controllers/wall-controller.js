var swig 			= require('swig');
var mongoose 		= require ('mongoose');
var postModel 		= require('../models/post-model')();



// TODO: Genera la pagina del muro (Si usuario logueado)
exports.index = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	var piecepost = swig.compileFile('views/piece-post.html');
	var piecenewpost = swig.compileFile('views/piece-newpost.html');

	postModel.list(20, 0, function (err, posts) {
		var postsRenders = Array();
		//Mete el form de post nuevo
		postsRenders.push(piecenewpost());
		//Renderiza los posts
		posts.forEach(function(post) {
			//Revisar
			postsRenders.push(piecepost(post));
		});
		res.status(200);
		//Manda todo
		res.send(baseweb({content: postsRenders}));
		res.end();
	});
}

// TODO: Añade un post a la base de datos
exports.addPost = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	//Recuperar post e insertar
	var npost = new postModel(req.body);
	npost.save(function (err) {
		if (err) return handleError(err);
		else {
			res.status(200);
			res.send("Post publicado correctamente");
			//FIXME: Hacer un redirect
			res.end();
		}
	});


}

// TODO: Obtiene un post en concreto
exports.getPost = function(req, res) {
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
				res.send(piecepost(post));
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
