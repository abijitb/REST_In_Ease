module.exports = {
    "default": {
        description: "Demo Response.",
        "content": {
            "application/json": {
                schema: {
                    properties: {
                        status: {
                            type: 'object',
                            properties: {
                                code: {
                                    type: 'string',
                                    description: 'Success'
                                },
                                message: {
                                    type: 'string',
                                    description: 'Status Message'
                                },
                            },
                        },
                        body: {
                            type: 'object',
                        },
                    },
                },
            }
        }
    },
};
