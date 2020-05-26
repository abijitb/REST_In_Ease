module.exports = {
    NotFound: Error.extend('Not Found', 401),
    BadRequest: Error.extend('Bad Request', 400),
    UserAlreadyExist: Error.extend('User Already Exist', 422),
    InvalidCredential: Error.extend('Invalid Credential', 401),
};
