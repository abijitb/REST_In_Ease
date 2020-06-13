const defaultResponseSchema = require('./responses/defaultResponseSchema');
const GetUSerDetails = {
    'x-swagger-router-controller': 'User',
    tags: [ 'User' ],
    description: "Returns all pets from the system that the user has access to",
    security: [{
        api_key: []
    }],
    operationId: 'GetUserDetails',
    parameters: [{
        in: "header",
        name: "token",
        description: "access token from the login",
        required: true,
        schema: {
            type: "string"
        }
    }],
    responses: { ...defaultResponseSchema }
};
module.exports = GetUSerDetails;
