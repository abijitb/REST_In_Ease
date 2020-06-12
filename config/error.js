module.exports = {
    NotFound: Error.extend('Not Found', 404),
    BadRequest: Error.extend('Bad Request', 400),
    DataAlreadyExist: Error.extend('Data Already Exist', 422),
    InvalidCredential: Error.extend('Invalid Credential', 401),
    Unauthorized: Error.extend('Unauthorized', 401),
};
