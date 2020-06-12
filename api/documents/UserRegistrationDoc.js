const defaultResponseSchema = require('./responses/defaultResponseSchema');
module.exports = {
    'x-swagger-router-controller': 'Auth',
    tags: [ 'AUTH' ],
    description: 'User Registration Process',
    operationId: 'UserRegistration',
    requestBody: {
        description: "User Registration Params",
        required: true,
        "content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        first_name: {
                            type: "string",
                            description: "First Name",
                        },
                        last_name: {
                            type: "string",
                            description: "Last Name",
                        },
                        email: {
                            type: "string",
                            description: "Email",
                        },
                        phone_number: {
                            type: "string",
                            description: "Phone Number",
                        },
                        password: {
                            type: "string",
                            description: "Password",
                        },
                        image: {
                            type: "string",
                            description: "Image",
                        },
                    },
                },
            }
        },
    },
    responses: { ...defaultResponseSchema }
};
