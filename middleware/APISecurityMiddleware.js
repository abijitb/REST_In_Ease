/**
 * API Security Middleware
 * @param app
 * @param JWT
 * @returns {function(...[*]=)}
 */
module.exports = ( app, JWT ) => {
    return ( req, authOrSecDef, scopesOrApiKey, callback ) => {

        const { token } = req.headers;

        if ( token ) {
            JWT.verify( token, app.get('AUTH_SECRET'), ( err, decode ) => {
                if ( err ) {
                    req.res.status( 401 ).send({
                        status: {
                            code: 401,
                            message: 'Failed To Authenticate Token.',
                        },
                    });
                    return req.res.end();
                }
                if ( decode ) {
                    req.user = decode;
                    return callback();
                }
            });
        } else {
            req.res.status( 401 ).send({
                status: {
                    code: 401,
                    message: 'Access Denied.',
                },
            });
            return req.res.end();
        }

    }
};
