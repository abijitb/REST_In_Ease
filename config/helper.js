const requireAll = require('require-all');
const Helper = requireAll({
    dirname     :  __dirname+'/../api/helpers/',
    filter      :  /(.+Helper)\.js$/i,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map         : function (name, path) {
        return name.split('Helper')[0];
    }
});

module.exports = Helper;
