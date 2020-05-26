/**
 * API Response Middleware
 * @param status
 * @returns {function(...[*]=)}
 */
module.exports = ( status ) => {
    return ( req, res, next ) => {
        res.success = ( code, payload ) => {

            const messageBody = status[ code ];
            let SuccessCode = 200;
            let SuccessMessage = 'Successful';

            if (messageBody) {
                SuccessCode = messageBody.code;
                SuccessMessage = messageBody.message;
            }

            res.status(SuccessCode);

            let responseObj = {
                status: {
                    code            : messageBody.code.toString(),
                    message         : SuccessMessage
                }
            };

            if (payload) {
                responseObj.body = payload;
            }

            return res.json(responseObj);
        };

        res.error = ( code, message, payload ) => {
            let messageBody = status[ code ];
            let ErrorCode = 500;
            let ErrorMessage = 'Error';

            if (messageBody) {
                ErrorCode = messageBody.code;
                ErrorMessage = messageBody.message;
            } else {
                code = 'ER500';
                messageBody = status[ code ];
                ErrorCode = messageBody.code || 500;
                ErrorMessage = message || messageBody.message;
            }

            res.status(ErrorCode);

            let responseObj = {
                status: {
                    code            : messageBody.code.toString(),
                    message         : ErrorMessage
                }
            };

            if (payload) {
                responseObj.error = payload;
            }

            console.log(`[ ERROR ] => ${ JSON.stringify(responseObj, null, 2) }`);
            return res.json(responseObj);
        };
        next();
    };
};
