const App = require('../config')();
const _ = App.packages._;

module.exports = ( runner ) => {

    return ( req, res, next ) => {

        var pipe = runner.getPipe(req);
        if (!pipe) { return next(); }

        var context = {
            _errorHandler: runner.defaultErrorHandler(),
            request: req,
            response: res,
            input: undefined,
            statusCode: undefined,
            headers: {},
            output: undefined
        };

        context._finish = function finishConnect(ignore1, ignore2) {

            if (context.error) {
                return next(context.error);
            }

            try {
                var response = context.response;
                if (context.statusCode) {
                    response.statusCode = context.statusCode;
                }
                if (context.headers) {
                    _.each(context.headers, function(value, name) {
                        response.setHeader(name, value);
                    });
                }
                if (context.output) {
                    var body = (typeof context.output === 'object') ? JSON.stringify(context.output) : context.output;
                    let error = JSON.parse(body);
                    if(error.code) {
                        try {
                            error.originalResponse = JSON.parse(error.originalResponse);
                        } catch(e) {
                            error.originalResponse = error.originalResponse;
                        }
                    }
                    response.end(body);
                }
                next();
            } catch (err) {
                next(err);
            }
        };
        runner.bagpipes.play(pipe, context);
    }
};
