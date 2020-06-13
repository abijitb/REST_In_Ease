const config                = require('../../../config')();
const {
    GetUserDetails, UserRegistration, UserLogin,
    TestPushQueue, TestMailQueue,
}                           = config.openApi();

module.exports = {
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
};
