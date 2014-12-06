var inter = require('i18n');
var swig = require('swig');

module.exports = function(app) {
    inter.configure({
        locales:['es', 'gl', 'en'],
        defaultLocale: 'es',
        extension: '.json',
        directory: __dirname + '/languages'
    });

    swig.setExtension('trans', function (v) {
        return inter.__(v); }
    );

    function compileTrans(compiler, args, content, parent, options) {
        return '_output += _ext.trans("' + content + '");'
    };

    function parseTrans(str, line, parser) {
        parser.on('*', function (token) {
            throw new Error('Unexpected token "' + token.match + '" on line ' + line + '.');
        });

        return true;
    };

    swig.setTag('trans', parseTrans, compileTrans, true);
}
