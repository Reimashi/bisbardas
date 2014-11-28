var swig 			= require('swig');

// Genera la pagina de inicio de sesión
exports.index = function(req, res) {
    var baseweb = swig.compileFile('views/base.html');
    var loginform = swig.compileFile('views/form-login.html');

    var viewparams = {
        'content': [loginform({ "formLoginError": req.param('form-error', false) })]
    }

    res.status(200).send(baseweb(viewparams)).end();
}

// TODO: Realiza el inicio de sesión
exports.login = function(req, res) {
    req.assert('username', 'Email required').notEmpty();
    req.assert('username', 'Malformed email').isEmail();
    req.assert('password', 'Password required').notEmpty().isEmail();

    var errors = req.validationErrors();
    if (errors) {

    }
}

// TODO: Cierra sesión y redirecciona a home
exports.logout = function(req, res) {
}
