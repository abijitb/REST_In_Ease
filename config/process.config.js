const requireAll    = require('require-all');
const fs            = require('fs');

const allProcesses = requireAll({
    dirname     :  __dirname+'/../processes/',
    filter      :  /(.+_PROCESS)\.js$/i,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
}),
processes = [],
PM2_LOG_PATH = `${ __dirname }/../pm2_logs`;

if ( !fs.existsSync( PM2_LOG_PATH ) ){
    fs.mkdirSync( PM2_LOG_PATH );
}

for ( p in allProcesses ) {
    processes.push({
        name            : p,
        script          : `${ __dirname }/../processes/${ p }.js`,
        error_file      : `${ PM2_LOG_PATH }/${ new Date() }-${ p }-err.log`,
        out_file        : `${ PM2_LOG_PATH }/${ new Date() }-${ p }-out.log`,
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
}

processes.push({
    name            : "API_PROCESS",
    script          : `${ __dirname }/../server.js`,
    error_file      : `${ PM2_LOG_PATH }/${ new Date() }-API_PROCESS-err.log`,
    out_file        : `${ PM2_LOG_PATH }/${ new Date() }-API_PROCESS-out.log`,
    watch           : false,
    env_development : {
        DEBUG          : "API_PROCESS:*",
        NODE_ENV       : "development"
    },
    env_production  : {
        NODE_ENV       : "production"
    },
    exec_mode  : "cluster",
    instances  : 1,
});

module.exports = {
    apps: processes,
};
