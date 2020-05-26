const requireAll = require('require-all');
const Helper = requireAll({
    dirname     :  __dirname+'/../api/dto/',
    filter      :  /(.+DTO)\.js$/i,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map         : function (name, path) {
        return name.split('DTO')[0];
    }
});

module.exports = Helper;
