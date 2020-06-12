const requireAll    = require('require-all');
const allProcesses = requireAll({
    dirname     :  __dirname+'/../processes/',
    filter      :  /(.+_PROCESS)\.js$/i,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
}),
clusterProcesses = [];
console.log(__dirname)
clusterProcesses.push({
    name            : "API_PROCESS",
    script          : __dirname+"/../server.js",
    watch           : false,
    env_development : {
        NODE_ENV       : "development"
    },
    env_production  : {
        NODE_ENV       : "production"
    },
    exec_mode  : "cluster",
    instances  : 1,
});

module.exports = {
    apps: clusterProcesses,
};
