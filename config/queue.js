const config                        = require('./index')();
const {
    PUSH_QUEUE, MAIL_QUEUE,
}                                   = config.state;
const {
    Queue,
}                                   = config.dependencies;
const System                        = require('../api/helpers/SystemHelper');
const QueueProcess = {},
Options =  {
    settings: {
        lockDuration: 3000,
        stalledInterval: 0,
        maxStalledCount: 1,
        guardInterval: 500,
        retryProcessDelay: 400,
    },
},
redis = System.redisConf();

console.log("[ REDIS ] =>", redis);

try {

    for ( let [ key ] of Object.entries( PUSH_QUEUE ) ) {
        QueueProcess[ key ] = new Queue( key, redis, Options );
    }

    for ( let [ key ] of Object.entries( MAIL_QUEUE ) ) {
        QueueProcess[ key ] = new Queue( key, redis, Options );
    }

    module.exports =  QueueProcess;
} catch ( error ) {
    console.error( "QUEUE ERROR", error );
}
