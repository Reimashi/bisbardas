var config      = require('./server');
var path        = require('path');
var swig        = require('swig');
var bodyParser  = require('body-parser');

module.exports = function (app) {
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, 'views'));
    app.set('view cache', !config.debug);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    swig.setDefaults({ cache: config.debug ? false : 'memory' });
}
