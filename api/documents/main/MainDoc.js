const config = require('../../../config')();
const {
    APP_NAME, APP_VERSION, APP_DESCRIPTION, BASE_URL, BASE_PATH,
}                           = config.state;
const {
    GetUserDetails, UserRegistration, UserLogin,
    TestPushQueue, TestMailQueue,
}                           = config.openApi();
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
    paths: {
        "/users/details": {
            "get": GetUserDetails,
        },
        "/auth/user/registration": {
            "post": UserRegistration,
        },
        "/auth/user/login": {
            "post": UserLogin,
        },
        "/test/queue/push": {
            "get": TestPushQueue,
        },
        "/test/queue/mail": {
            "get": TestMailQueue,
        },
    },
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
