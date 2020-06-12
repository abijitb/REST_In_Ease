const { requireAll } = require('./dependencies');
const OpenApi = requireAll({
    dirname     :  __dirname+'/../api/documents/',
    filter      :  /(.+Doc)\.js$/i,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map     : function (name, path) {
        return name.split('Doc')[0];
    }
});

module.exports = OpenApi;
