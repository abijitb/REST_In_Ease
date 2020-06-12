/**
 * API Validation Middleware
 * @param Validations
 * @returns {function(...[*]=)}
 */
module.exports = ( Validations ) => {
    return ( req, res, next ) => {

        if ( req.method === 'POST' ) {
            const { operationId } = req.openapi[ req.path.replace( process.env.BASE_PATH, '' ) ].post;

            if ( operationId ) {
                const result = Validations.validate( operationId, req.body );

                if ( !result.valid ) {
                    return res.error("ERR422", 'Validation Error',  result.errors);
                }
            }
        }
        next();
    }
};
