const config                = require('../../config')();
const {
    joi, joiPhoneExtension
}                           = config.dependencies;
const joiExtended           = joi.extend(joiPhoneExtension);

module.exports = joiExtended.object().keys({
    email: joiExtended.string().required().label('Email'),
    password: joiExtended.string().required().label('Password'),
});
