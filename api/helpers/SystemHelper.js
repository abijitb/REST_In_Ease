module.exports = {
    ErrorResponse           : ErrorResponse,
    redisConf               : redisConf,
};

/**
 * Error Response Helper
 * @param res
 * @returns {function(...[*]=)}
 * @constructor
 */
function ErrorResponse ( res ) {
    return ( error ) => {
        console.log(`[ ERROR STACK ] => ${ error.stack }`);
        if ( !error.errors ) {
            return res.error( error.message, error.name );
        } else if ( error.errors && error.name && error.name.match( /Sequelize/ ) ) {
            let errorItems = error.errors.map(( err, i ) => {
                return `\n[ ${ i + 1 } ] => ${ err.message }`;
            });
            console.log(`[ SERVER ERROR ] => ${ errorItems }`);
            return res.error( "ERR500", error.message );
        } else {
            return res.error( error.message );
        }
    }
}

/**
 * Redis Configuration
 * @returns {{port: string | number, host: string | string, connectTimeout: number}|{connectTimeout: number, url: string}}
 */
function redisConf () {
    let redis;
    if ( process.env.REDIS_URL ) {
        redis = {
            url: process.env.REDIS_URL,
            connectTimeout: 40000
        }
    } else {
        redis = {
            port: process.env.REDIS_PORT || 6379,
            host: process.env.REDIS_HOST || '127.0.0.1',
            connectTimeout: 40000
        }
    }
    return redis;
}
