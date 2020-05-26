const config = require('../../config')();
const { joi, joiPhoneExtension } = config.packages;
const joiExtended = joi.extend(joiPhoneExtension);

module.exports = joiExtended.object().keys({
    email: joiExtended.string().email().required().label('Email'),
    password: joiExtended.string().required().label('Password'),
});
