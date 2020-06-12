const defaultResponseSchema = require('./responses/defaultResponseSchema');
module.exports = {
    'x-swagger-router-controller': 'Auth',
    tags: [ 'AUTH' ],
    description: 'User Login',
    operationId: 'UserLogin',
    requestBody: {
        description: "User Login Params",
        required: true,
        "content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            description: "Email",
                        },
                        password: {
                            type: "string",
                            description: "Password",
                        },
                    },
                },
            }
        },
    },
    responses: { ...defaultResponseSchema }
};
