/**
 * REST In Ease
 * Custom Node Js Framework Which is Made From Express Js And Swagger
 * Author: Abijit Biswas
 */
'use strict';
require('dotenv').config();
process.setMaxListeners(65);

const AppJS                     = require('./app');
const app                       = AppJS.packages.express;
const {
    SwaggerExpress,
    jwt,
}                               = AppJS.packages;
const Middleware                = AppJS.middleware();
const ResponseMessages          = AppJS.responseMessages();
const { SECRET }                = AppJS.constant;

module.exports = app;

app.set('AUTH_SECRET', SECRET);
var config = {
    appRoot: __dirname,
    swaggerSecurityHandlers: {
        api_key: Middleware.APISecurity(app, jwt),
    },
};

SwaggerExpress.create(config, function(err, swaggerExpress) {

    if (err) {
        return console.log(err);
    }

    /**
     * API Headers
     */
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    /**
     * Basic Swagger Tools
     */
    app.use(swaggerExpress.runner.swaggerTools.swaggerUi());
    app.use(swaggerExpress.runner.swaggerTools.swaggerMetadata());
    /**
     * Request And Response Middleware
     */
    app.use(Middleware.APIRequest());
    app.use(Middleware.APIResponse(ResponseMessages));
    /**
     * API Validation Middleware
     */
    app.use(Middleware.APIValidation(AppJS.validation()));
    /**
     * Custom Swagger Configuration Middleware
     */
    app.use(Middleware.SwaggerConfig(swaggerExpress.runner));

    const port = process.env.PORT || 10011;
    app.listen(port,() => {
        console.log(`[ MEMORY USAGE ] => ${ JSON.stringify(process.memoryUsage(), null, 2) }\n[ SERVER ] => http://localhost:${port}`);
    })

});
