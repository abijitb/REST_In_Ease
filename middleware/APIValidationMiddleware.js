/**
 * API Validation Middleware
 * @param Validations
 * @returns {function(...[*]=)}
 */
module.exports = (Validations) => {
    return (req, res, next) => {

        if ( req.swagger && req.swagger.operation ) {
            const Operation = req.swagger.operation.operationId;
            let Value = req.swagger.params[Operation];

            if ( Value ) {
                Value = Value.value;
                const result = Validations.validate(Operation, Value);

                if ( !result.valid ) {
                    return res.error("ERR422", 'Validation Error',  result.errors);
                }
            }
        }
        next();
    }
};
