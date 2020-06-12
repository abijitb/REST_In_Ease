/**
 * API Request Middleware
 * @returns {function(...[*]=)}
 */
module.exports = () => {
    return (req, res, next) => {

        let query = req.query;

        /**
         * For GET Method
         * @param key
         * @returns {*}
         */
        req.get = ( key ) => {
            if ( req.method === "GET" ) {
                return req.body[ key ];
            }
        };

        /**
         * For POST Method
         * @param key
         * @returns {*}
         */
        req.post = ( key ) => {
            if ( req.method === "POST" ) {
                return req.body[ key ];
            }

        };

        /**
         * For Query Parameter
         * @param value
         * @returns {query|*}
         */
        req.query = ( value ) => {
            if( !value ) {
                return query;
            }
            return query[ value ];
        };

        next();

    };
};
