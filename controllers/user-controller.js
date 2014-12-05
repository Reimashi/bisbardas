var swig 		    = require('swig');
var mongoose 		= require ('mongoose');
var validator 		= require('express-validator');
var userModel 		= require('../models/user-model')();

// TODO: Genera la pagina de perfil del usuario
exports.index = function(req, res) {
	var baseweb = swig.compileFile('views/base.html');
	res.status(200);
	res.send(baseweb({}));
	res.end();
}

// TODO: Añade un nuevo usuario (Registro)
exports.add = function(req, res) {
	/*req.checkBody('username', 'El email no puede estar vacio').notEmpty();
        req.checkBody('password', 'La contraseña no puede estar vacia').notEmpty();
        req.checkBody('password2', 'Por favor repite la contraseña').notEmpty();
		//Falta comprobar que sean iguales
        req.checkBody('firstname', 'El Nombre no puede estar vacio').notEmpty();
        req.checkBody('lastname', 'Los apellidos no pueden estar vacios').notEmpty();

	var errors = req.validationErrors();
  	console.log(errors);

  	if (errors) {
    		res.send("Errores en formulario");
	}
	else {
		var newUser = new userModel(req.body);
		res.send("Usuario creado correctamente");
	}*/
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
