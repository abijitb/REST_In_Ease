const requireAll = require('require-all');
const Validation = requireAll({
    dirname     :  __dirname+'/../api/validations/',
    filter      :  /(.+Validation)\.js$/i,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true,
    map         : function (name, path) {
        return name.split('Validation')[0];
    }
});

/**
 * Validating The Schemas And Values
 * @param values
 * @returns {{valid: boolean, errors: *}|{valid: boolean, errors: null}}
 */
Validation.validate = function ( Operation, values ) {
    var result = Validation[Operation].validate(values, { abortEarly: false });
    if ( result.error !== null ) {
        return { valid : false, errors : this.errors(result.error)}
    }
    return { valid : true, errors : null};
};

/**
 * Manipulating The Joi Response In a Standard Manner
 * @param joiError
 * @returns {{}}
 */
Validation.errors = ( joiError ) => {
    var validationErrors = {};
    for ( var i = 0, length_of_i = joiError.details.length; i < length_of_i; i++ ) {
        var detail = joiError.details[i];
        var path = detail.path;
        validationErrors[path] = detail.message;
    }
    return validationErrors;
};

module.exports = Validation;
