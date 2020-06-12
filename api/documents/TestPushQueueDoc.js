const defaultResponseSchema = require('./responses/defaultResponseSchema');
module.exports = {
    'x-swagger-router-controller': 'Test',
    tags: [ 'TEST' ],
    description: "Testing Push Queue",
    security: [{
        api_key: []
    }],
    operationId: 'TestPushQueue',
    parameters: [{
        in: "header",
        name: "token",
        description: "access token from the login",
        required: true,
        schema: {
            type: "string"
        }
    }, {
        name: "first_name",
        in: "query",
        description: "First Name",
        required: false,
        schema: {
            type: "string"
        }
    }, {
        name: "last_name",
        in: "query",
        description: "Last Name",
        required: false,
        schema: {
            type: "string"
        }
    }],
    responses: { ...defaultResponseSchema }
};
