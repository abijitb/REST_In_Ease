const config            = require('../../config')();
const Model             = config.model();
const Op                = Model.Op;
const AppErr            = config.error();
const {
    bcrypt, JWT,
}                       = config.dependencies;
const {
    System
}                       = config.helper();
const {
    DB_TABLES, SALT_ROUND, AUTH_SECRET
}                       = config.state;
const User              = Model[ DB_TABLES.USER ];

module.exports = {
    UserRegistration            : UserRegistration,
    UserLogin                   : UserLogin,
};

/**
 * User Registration Process
 * @param req
 * @param res
 * @constructor
 * @route `/auth/user/registration`
 */
function UserRegistration ( req, res ) {

    let userCreateObj = {
        first_name: req.post('first_name'),
        last_name: req.post('last_name'),
        email: req.post('email'),
        phone_number: req.post('phone_number'),
    };

    if ( req.post('image') ) {
        userCreateObj.image = req.post('image');
    }

    User.findOne({
        where: {
            [Op.or]: [{
                email: req.post('email'),
            }, {
                phone_number: req.post('phone_number'),
            }],
        },
        attributes: [ 'id' ],
        raw: true,
    })
        .then(( userRes ) => {
            if ( userRes ) {
                throw new AppErr.DataAlreadyExist( "USER400" );
            }
            return bcrypt.genSalt( SALT_ROUND );
        })
            .then(( generatedSalt ) => {
                return bcrypt.hash( req.post('password'), generatedSalt );
            })
                .then(( generatedHashPassword ) => {
                    userCreateObj.password = generatedHashPassword;
                    return User.create( userCreateObj );
                })
                    .then(( userCrtRes ) => {
                        const tokenPayload = {
                            id: userCrtRes.id,
                        };
                        const token = JWT.sign( tokenPayload, AUTH_SECRET, {
                            expiresIn: "365 days",
                        });
                        return res.success( "USER201", {
                            user: userCrtRes.dataValues,
                            token,
                        });
                    })
                    .catch(System.ErrorResponse(res));

}

/**
 * User Login
 * @param req
 * @param res
 * @constructor
 * @route `/auth/user/login`
 */
function UserLogin ( req, res ) {

    let userObj = {};

    User.findOne({
        where: {
            email: req.post('email'),
            deletedAt: null,
        },
        raw: true,
    })
        .then(( userRes ) => {
            if ( !userRes ) {
                throw new AppErr.InvalidCredential( "USER401" );
            }
            userObj = userRes;
            return bcrypt.compare( req.post('password'), userRes.password );
        })
        .then(( passMatchRes ) => {
            if ( !passMatchRes ) {
                throw new AppErr.InvalidCredential( "USER401" );
            }
            const tokenPayload = {
                id: userObj.id,
            };
            const token = JWT.sign( tokenPayload, AUTH_SECRET, {
                expiresIn: "365 days",
            });
            return res.success( "USER203", {
                user: {
                    id: userObj.id,
                    first_name: userObj.first_name,
                    last_name: userObj.last_name,
                    email: userObj.email,
                    phone_number: userObj.phone_number,
                    image: userObj.image,
                },
                token,
            });
        })
        .catch(System.ErrorResponse(res));

}
