const config = require('../../config')();
const joi  = config.packages.joi;
const joiPhoneExtension = config.packages.joiPhoneExtension;
const joiExtended = joi.extend(joiPhoneExtension);

module.exports = joiExtended.object().keys({
    first_name: joiExtended.string().required().label('First Name'),
    last_name: joiExtended.string().required().label('Last Name'),
    email: joiExtended.string().required().label('Email'),
    password: joiExtended.string().required().label('Password'),
    phone_number: joiExtended.phoneNumber().required().defaultRegion('IN').type('MOBILE').format('E164').label('Phone Number'),
    image: joiExtended.string().label('Image'),
});
