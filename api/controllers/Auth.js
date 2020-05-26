const config = require('../../config')();
const Model = config.model();
const Helper = config.helper();
const AppErr = config.error();
const DTO = config.dto();
const Constant = config.constant;
const Op = Model.Op;
const { DB_TABLES, SALT_ROUND, SECRET } = Constant;
const { bcrypt, jwt } = config.packages;

const { Response } = Helper;
const User = Model[ DB_TABLES.USER ];

const { UserResponse } = DTO;

module.exports = {
    AuthUserRegistration                    : AuthUserRegistration,
    AuthUserLogin                           : AuthUserLogin,
};

/**
 * User Registration Process
 * @param req
 * @param res
 * @constructor
 * @route `/auth/user/create`
 */
function AuthUserRegistration (req, res) {

    let userCreateObj = {
        first_name: req.post('first_name'),
        last_name: req.post('last_name'),
        email: req.post('email'),
        phone_number: req.post('phone_number'),
    };

    if (req.post('image')) {
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
        .then((userRes) => {
            if (userRes) {
                throw new AppErr.UserAlreadyExist("USR402");
            }
            return bcrypt.genSalt(SALT_ROUND);
        })
            .then((generatedSalt) => {
                return bcrypt.hash(req.post('password'), generatedSalt);
            })
                .then((generatedHashPassword) => {
                    userCreateObj.password = generatedHashPassword;
                    return User.create(userCreateObj);
                })
                    .then((userCrtRes) => {
                        const tokenPayload = {
                            id: userCrtRes.id,
                        };
                        const token = jwt.sign(tokenPayload, SECRET, {
                            expiresIn: "365 days",
                        });
                        return res.success("USR201", {
                            user: UserResponse(userCrtRes.dataValues),
                            token,
                        });
                    })
                    .catch(Response.ErrorResponse(res));
}


function AuthUserLogin (req, res) {

    let userObj = {};

    User.findOne({
        where: {
            email: req.post('email'),
            deletedAt: null,
        },
        raw: true,
    })
        .then((userRes) => {
            if (!userRes) {
                throw new AppErr.InvalidCredential("USR403");
            }
            userObj = userRes;
            return bcrypt.compare(req.post('password'), userRes.password);
        })
            .then((passMatchRes) => {
                if (!passMatchRes) {
                    throw new AppErr.InvalidCredential("USR403");
                }
                const tokenPayload = {
                    id: userObj.id,
                };
                const token = jwt.sign(tokenPayload, SECRET, {
                    expiresIn: "365 days",
                });
                return res.success("USR202", {
                    user: UserResponse(userObj),
                    token,
                });
            })
            .catch(Response.ErrorResponse(res));
}
