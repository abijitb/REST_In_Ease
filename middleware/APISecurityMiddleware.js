module.exports = ( app, jwt ) => {
    return ( req, authOrSecDef, scopesOrApiKey, cb ) => {

        const { authorization } = req.headers;

        if (authorization) {
            jwt.verify(authorization, app.get('AUTH_SECRET'), (err, decode) => {
                if (err) {
                    req.res.status(401).json({
                        status: {
                            code: 401,
                            message: 'Failed To Authenticate Token.',
                        },
                    });
                    return req.res.end();
                }
                if (decode) {
                    req.user = decode;
                    return cb();
                }
            });
        } else {
            req.res.status(401).json({
                status: {
                    code: 401,
                    message: 'Access Denied.',
                },
            });
            return req.res.end();
        }

    }
};
