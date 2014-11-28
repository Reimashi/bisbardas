var swig 			= require('swig');
//var util 			= require('util');
var mongoose 		= require ('mongoose');
//var validator 		= require('express-validator');
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
  /*Comprobaciones (no vacio)
  req.checkBody('title', 'El titulo no puede estar vacio').notEmpty();
  req.checkBody('body', 'El post debe tener contenido').notEmpty();
  var errors = req.validationErrors();
  console.log(errors);

  if (errors) {
    res.send("Errores en formulario");
	}
  else {
  	//Recuperar post e insertar
		var npost = new postModel(req.body);
		npost.save(function (err) {
			if (err) return handleError(err);
		});
		res.send("Post publicado correctamente");
  }*/
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
					res.send(post);
				}
			}
		);


}

// TODO: Borra el post pasado como parametro
exports.deletePost = function(req, res) {
	var id = req.body.id;
	post.delete(function (err, post){
		if (err) res.json(err);
		else{
		postModel
		.findOne()
		.where('post._id').equals(id)
		.exec(
				function (err, post) {
					if (err) return handleError(err);
					else {
						console.log('Vamos a eliminar');
					}
				}
			);
		}
	});
}

// Faltan los likes
