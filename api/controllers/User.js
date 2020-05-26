const config = require('../../config')();
const Model = config.model();
const Helper = config.helper();
const AppErr = config.error();

const { DB_TABLES } = config.constant;

const { Response } = Helper;
const User = Model[ DB_TABLES.USER ];

module.exports = {
    GetAllUsers                     : GetAllUsers,
};

/**
 * Get All Users
 * @param req
 * @param res
 * @constructor
 * @route `/user/list`
 */
function GetAllUsers (req, res) {

    User.findAll({
        where: {
            deletedAt: null,
        },
        attributes: [ 'id', 'first_name', 'last_name', 'email', 'phone_number', 'image' ],
        raw: true,
    })
        .then((userRes) => {
            if (userRes.length < 1) {
                throw new AppErr.NotFound("USR400");
            }
            return res.success("USR200", { all_users: userRes });
        })
        .catch(Response.ErrorResponse(res));
}
