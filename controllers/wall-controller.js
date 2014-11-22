var swig 			= require('swig');
var mongoose 		= require ('mongoose');
var validator 		= require('express-validator');
var postModel 		= mongoose.model('Post');



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
  //Comprobaciones (no vacio)
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
		res.send("Post publicado correctamente");
  }
}

// TODO: Obtiene un post en concreto
exports.getPost = function(req, res) {
	var piecepost = swig.compileFile('views/piece-post.html');
	var id = req.body.id;

	post.get(function (err, post){
		if (err) res.json(err);
		else {
			//
			res.send("elpost");
			}
	});
}

// TODO: Borra el post pasado como parametro
exports.deletePost = function(req, res) {
	//Obtener post de algun modo y...
	post.delete(function (err, post){
		if (err) res.json(err);
		else {}
});
}

// Faltan los likes
