module.exports = ( paths ) => {
    return ( req, res, next ) => {
        res.header( "Access-Control-Allow-Origin", "*" );
        res.header( 'Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST' );
        res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
        req.openapi = paths;
        next();
    };
};
