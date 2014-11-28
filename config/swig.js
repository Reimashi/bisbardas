var favicon     = require('serve-favicon');
var config      = require('./server');
var path        = require('path');
var swig        = require('swig');
var bodyParser  = require('body-parser');
var validator   = require('express-validator');

module.exports = function (app) {
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, 'views'));
    app.set('view cache', !config.debug);
    app.use(favicon('./public/img/favicon.ico'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(validator());
    swig.setDefaults({ cache: config.debug ? false : 'memory' });
}
