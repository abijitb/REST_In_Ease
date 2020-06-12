'use strict';
require('dotenv').config();
require('extend-error');
process.setMaxListeners(65);

const config                    = require('./config')();
const {
    app, OASTools, swaggerUI, JWT,
}                               = config.dependencies;
const MainDoc                   = require('./api/documents/main/MainDoc');
const {
    APIRequest, APIResponse, APISecurity, APIValidation, OpenApiToRequest
}                               = config.middleware();
const { responseMessage }       = config;
const {
    AUTH_SECRET,
}                               = config.state;

app.set('AUTH_SECRET', AUTH_SECRET);

/**
 * Required Parameters To Configure OAS Tool
 * @type {{checkControllers: boolean, loglevel: string, controllers: string, oasSecurity: boolean, securityFile: {api_key: any}}}
 */
var oasConfig = {
    controllers: __dirname + '/api/controllers',
    checkControllers: true,
    loglevel: 'info',
    oasSecurity: true,
    securityFile: {
        api_key: APISecurity( app, JWT ),
    },
};

/**
 * OAS Tool Configurations
 */
OASTools.configure( oasConfig );

/**
 * OAS Tool Middleware Initialization
 */
OASTools.initializeMiddleware( MainDoc, app, ( middleware ) => {

    /**
     * Open API Paths Assigned To Request
     * And Api Headers
     */
    app.use( OpenApiToRequest( MainDoc.paths ) );

    /**
     * Meta Data
     */
    app.use( middleware.swaggerMetadata() );

    /**
     * Swagger UI Setup
     */
    app.use( '/docs', swaggerUI.serve, swaggerUI.setup( MainDoc ) );

    /**
     * API Request Middleware
     */
    app.use( APIRequest() );

    /**
     * API Response Middleware
     */
    app.use( APIResponse( responseMessage ) );

    app.use( APIValidation( config.validation() ) );

    /**
     * Server Creation
     * @type {number}
     */
    const port = process.env.PORT || 9000;
    app.listen( port, () => {
        console.log(`[ SERVER ] => http://localhost:${port}`);
    });
});
module.exports = app;
