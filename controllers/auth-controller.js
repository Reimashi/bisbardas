var swig 		= require('swig');
var mongoose    = require('mongoose');
var crypto 		= require('crypto');

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

// Genera la pagina de inicio de sesión
exports.loginGet = function(req, res) {
    var baseweb = swig.compileFile('views/base.html');
    var baseurl = 'http://' + req.headers.host + '/';
    var formrender;

    if (req.session.refer && req.session.refer.id && req.session.refer.id == 'auth-login') {
        if (req.session.refer.error) {
            var error = req.session.refer.error;
            var formlog = swig.compileFile('views/form-login.html');
            formrender = formlog({formerror: error, baseurl: baseurl});
        }
        else if (req.session.refer.postok) {
            res.redirect(baseurl);
        }
    }
    else {
        var formlog = swig.compileFile('views/form-login.html');
        formrender = formlog({baseurl: baseurl});
    }

    req.session.refer = new Array();
    res.status(200);
    res.send(baseweb({content: [formrender], baseurl: baseurl}));
    res.end();
}

// TODO: Realiza el inicio de sesión
exports.loginPost = function(req, res) {
    if (req.param('form-name') == 'auth-login') {
        req.checkBody('username', 'Email required').notEmpty();
        req.checkBody('username', 'Malformed email').isEmail();
        req.checkBody('password', 'Password required').notEmpty();

        req.sanitize('username').normalizeEmail().toString();
        req.sanitize('password').toString();

        var errors = req.validationErrors();

        if (errors) {
            redirectFromPost(req, res, 'auth-login', 'auth/login', errors.shift());
        }
        else {
            var encpassword = crypto.createHash('sha1');
            encpassword.update(req.param('password'));

            var userModel = mongoose.model('User');

            userModel.find({ email: req.param('username'), password: encpassword.digest('hex') }, function(err, count) {
                if (count.length > 0) {
                    req.session.user = count.shift();
                    var baseurl = 'http://' + req.headers.host + '/';
                    res.redirect(baseurl);
                }
                else {
                    redirectFromPost(req, res, 'auth-login', 'auth/login', { msg: 'Username or password incorrect.' });
                }
            });
        }
    }
    else {
        redirectFromPost(req, res, 'auth-login', 'auth/login');
    }
}

// TODO: Cierra sesión y redirecciona a home
exports.logoutPost = function(req, res) {
    var baseurl = 'http://' + req.headers.host + '/';
    req.session.user = false;
}
