var url 			= require('url');
var swig 		    = require('swig');
var i18n 		    = require('i18n');
var mongoose 		= require('mongoose');
var crypto 			= require('crypto');
var validator 		= require('express-validator');
var userModel 		= require('../models/user-model')();

function redirectFromPost (req, res, form, path, error) {
	var baseurl = 'http://' + req.headers.host + '/';
	req.session.refer = new Array();

	if (error) {
		req.session.refer = {
			id: form,
			postok: false,
			error: error
		};
	}
	else {
		req.session.refer = {
			id: form,
			postok: true,
			error: false
		};
	}

	res.redirect(baseurl + path);
}

// TODO: Genera la pagina de perfil del usuario
exports.index = function(req, res) {
	var baseurl = 'http://' + req.headers.host + '/';
	res.redirect(baseurl + 'user/modify');
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
			formrender = formreg({formerror: error, baseurl: baseurl, user: req.session.userl});
		}
		else if (req.session.refer.postok) {
			var formreg = swig.compileFile('views/form-registry-success.html');
			formrender = formreg({baseurl: baseurl, user: req.session.user});
		}
	}
	else {
		var formreg = swig.compileFile('views/form-registry.html');
		formrender = formreg({baseurl: baseurl, user: req.session.user});
	}

	req.session.refer = new Array();
	res.status(200);
	res.send(baseweb({content: [formrender], baseurl: baseurl, user: req.session.user}));
	res.end();
}

// TODO: Añade un nuevo usuario (Registro)
exports.addPost = function(req, res) {

	if (req.param('form-name') == 'user-registry') {
		req.checkBody('username', i18n.__('El email no puede estar vacio.')).notEmpty();
		req.checkBody('username', i18n.__('El email no es correcto.')).isEmail();
		req.checkBody('password', i18n.__('La contraseña no puede estar vacia.')).notEmpty();
		req.checkBody('password', i18n.__('La contraseña debe estar compuesta por caracteres alfanuméricos.')).isAlphanumeric();
		req.checkBody('password', i18n.__('La contraseña debe tener un tamaño de entre 6 y 24 caracteres.')).len(6, 24);
		req.checkBody('password-repeat', i18n.__('Las contraseñas deben coincidir.')).equals(req.param('password'));
	    req.checkBody('firstname', i18n.__('El Nombre no puede estar vacio')).notEmpty();
	    req.checkBody('lastname', i18n.__('Los apellidos no pueden estar vacios')).notEmpty();

		req.sanitize('username').normalizeEmail().toString();
		req.sanitize('password').toString();
		req.sanitize('firstname').toString();
		req.sanitize('lastname').toString();

		var errors = req.validationErrors();

	  	if (errors) {
			redirectFromPost(req, res, 'user-registry', 'user/add', errors.shift());
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
						redirectFromPost(req, res, 'user-registry', 'user/add', {msg: i18n.__("This email already has been registrated.")});
					}
					else {
						redirectFromPost(req, res, 'user-registry', 'user/add', {msg: i18n.__("Internal error. Contact administrator.")});
					}
				}
				else {
					redirectFromPost(req, res, 'user-registry', 'user/add');
				}
			});
		}
	}
	else {
		redirectFromPost(req, res, 'user-registry', 'user/add');
	}
}

// TODO: Modifica los datos de un usuario
exports.modifyGet = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	var baseurl = 'http://' + req.headers.host + '/';
	var formrender;

	if (req.session.refer && req.session.refer.id && req.session.refer.id == 'user-registry') {
		if (req.session.refer.error) {
			var error = req.session.refer.error;
			var formreg = swig.compileFile('views/form-registry.html');
			formrender = formreg({formerror: error, baseurl: baseurl, user: req.session.user});
		}
		else if (req.session.refer.postok) {
			var formreg = swig.compileFile('views/form-registry-success.html');
			formrender = formreg({baseurl: baseurl, user: req.session.user});
		}
	}
	else {
		var formreg = swig.compileFile('views/form-user-info.html');
		formrender = formreg({baseurl: baseurl, user: req.session.user});
	}

	req.session.refer = new Array();
	res.status(200);
	res.send(baseweb({jscripts: [baseurl + 'static/js/forms-parse.js'], content: [formrender], baseurl: baseurl, user: req.session.user}));
	res.end();
}

// TODO: Modifica los datos de un usuario
exports.modifyPost = function(req, res) {

	if (req.param('form-name') == 'user-modify-lang') {
		req.checkBody('language', i18n.__('Incorrect language.')).isIn(req.getCatalog());

		var errors = req.validationErrors();

		if (errors) {
			redirectFromPost(req, res, 'user-modify-lang', 'user/modify', errors.shift());
		}
		else {
			req.session.user.lang = req.param('language');
			res.setLocale(req.session.user.lang);
			redirectFromPost(req, res, 'user-modify-lang', 'user/modify');
		}
	}
	else {
		redirectFromPost(req, res, 'user-modify-lang', 'user/modify');
	}
}

// TODO: Borra un usuario (el actual)
exports.delete = function(req, res) {
	//obtener el usuario de algun modo y...
	user.delete(function (err, post){
		if (err) res.json(err);
	});
}
