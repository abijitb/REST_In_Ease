const requireAll = require('require-all');
const Middleware = requireAll({
    dirname     :  __dirname+'/../middleware/',
    filter      :  /(.+Middleware)\.js$/i,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map         : function (name, path) {
        return name.split('Middleware')[0];
    }
});

module.exports = Middleware;
