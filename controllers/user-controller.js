var url 			= require('url');
var swig 		    = require('swig');
var i18n 		    = require('i18n');
var mongoose 		= require('mongoose');
var crypto 			= require('crypto');
var validator 		= require('express-validator');
var userModel 		= require('../models/user-model')();

// TODO: Genera la pagina de perfil del usuario
exports.index = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	res.status(200);
	res.send(baseweb({}));
	res.end();
}

// TODO: Añade un nuevo usuario (Registro). Imprime el formulario.
exports.addGet = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	var baseurl = 'http://' + req.headers.host + '/';
	var formrender;

	if (req.session.refer && req.session.refer.id && req.session.refer.id == 'user-registry') {
		if (req.session.refer.error) {
			var error = req.session.refer.error;
			var formreg = swig.compileFile('views/form-registry.html');
			formrender = formreg({formerror: error, baseurl: baseurl});
		}
		else if (req.session.refer.postok) {
			var formreg = swig.compileFile('views/form-registry-success.html');
			formrender = formreg({baseurl: baseurl});
		}
	}
	else {
		var formreg = swig.compileFile('views/form-registry.html');
		formrender = formreg({baseurl: baseurl});
	}

	req.session.refer = new Array();
	res.status(200);
	res.send(baseweb({content: [formrender], baseurl: baseurl}));
	res.end();
}

// TODO: Añade un nuevo usuario (Registro)
exports.addPost = function(req, res) {

	function redirectAdd (req, res, error) {
		var baseurl = 'http://' + req.headers.host + '/';
		req.session.refer = new Array();

		if (error) {
			req.session.refer = {
				id: 'user-registry',
				postok: false,
				error: error
			};
		}
		else {
			req.session.refer = {
				id: 'user-registry',
				postok: true,
				error: false
			};
		}

		res.redirect(baseurl + 'user/add');
	}

	if (req.param('form-name') == 'user-registry') {
		req.checkBody('username', 'El email no puede estar vacio.').notEmpty();
		req.checkBody('username', 'El email no es correcto.').isEmail();
		req.checkBody('password', 'La contraseña no puede estar vacia.').notEmpty();
		req.checkBody('password', 'La contraseña debe estar compuesta por caracteres alfanuméricos.').isAlphanumeric();
		req.checkBody('password', 'La contraseña debe tener un tamaño de entre 6 y 24 caracteres.').len(6, 24);
	    req.checkBody('firstname', 'El Nombre no puede estar vacio').notEmpty();
	    req.checkBody('lastname', 'Los apellidos no pueden estar vacios').notEmpty();

		req.sanitize('username').normalizeEmail().toString();
		req.sanitize('password').toString();
		req.sanitize('firstname').toString();
		req.sanitize('lastname').toString();

		var errors = req.validationErrors();

	  	if (errors) {
			redirectAdd(req, res, errors.shift());
		}
		else {
			var encpassword = crypto.createHash('sha1');
			encpassword.update(req.param('password'));

			var newUser = new userModel({
				email: req.param('username'),
				name: {
					first: req.param('firstname'),
					last: req.param('lastname')
				},
				password: encpassword.digest('hex')
			});

			newUser.save(function(err){
				if (err) {
					if (err = "ValidationError: Email already exists") {
						redirectAdd(req, res, {msg: "This email already has been registrated."});
					}
					else {
						redirectAdd(req, res, {msg: "Internal error. Contact administrator."});
					}
				}
				else {
					redirectAdd(req, res);
				}
			});
		}
	}
	else {
		redirectAdd(req, res);
	}
}

// TODO: Modifica los datos de un usuario
exports.modify = function(req, res) {
	//suponemos que se muestra un formulario con los datos previos ya cubiertos
	req.checkBody('username', 'El email no puede estar vacio').notEmpty();
    req.checkBody('password', 'La contraseña no puede estar vacia').notEmpty();
    req.checkBody('password2', 'Por favor repite la contraseña').notEmpty();
    //Falta comprobar que sean iguales. Nota Aitor: La segunda contraseña no se manda al server, se comprueba en el navegador con jQuery o algo asi
    req.checkBody('firstname', 'El Nombre no puede estar vacio').notEmpty();
    req.checkBody('lastname', 'Los apellidos no pueden estar vacios').notEmpty();

    var errors = req.validationErrors();
    console.log(errors);

    if (errors) {
            res.send("Errores en formulario");
    }
    else {
	//modificar la bd
            res.send("Usuario creado correctamente");
    }
}

// TODO: Borra un usuario (el actual)
exports.delete = function(req, res) {
	//obtener el usuario de algun modo y...
	user.delete(function (err, post){
		if (err) res.json(err);
	});
}
