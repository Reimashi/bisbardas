var swig    = require('swig');

// Genera la pagina de inicio
exports.index = function(req, res) {
    var baseweb = swig.compileFile('views/base.html');
    var formreg = swig.compileFile('views/form-registry.html');

    res.status(200);

    res.send(baseweb({content: [formreg()]}));

    res.end();
}
