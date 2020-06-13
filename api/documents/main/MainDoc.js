const config = require('../../../config')();
const {
    APP_NAME, APP_VERSION, APP_DESCRIPTION, BASE_URL, BASE_PATH,
}                           = config.state;
const PathDoc               = require('../path/PathDoc');
const MainDoc = {
    openapi: '3.0.1',
    info: {
        title: APP_NAME,
        version: APP_VERSION,
        description: APP_DESCRIPTION,
    },
    servers: [{
        url: `${ BASE_URL }${ BASE_PATH }`
    }],
    paths: { ...PathDoc },
    components: {
        securitySchemes: {
            api_key: {
                type: 'apiKey',
                name: 'token',
                in: 'header',
            }
        },
        schemas: {},
    },
};
module.exports = MainDoc;
