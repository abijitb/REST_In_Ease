const config            = require('../../config')();
const Model             = config.model();
const {
    System,
}                       = config.helper();
const {
    DB_TABLES,
}                       = config.state;
const User              = Model[ DB_TABLES.USER ];

module.exports = {
    GetUserDetails                  : GetUserDetails,
};

function GetUserDetails ( req, res ) {

    User.findAll({
        where: {
            deletedAt: null,
        },
    })
        .then(( userRes ) => {
            const payload  = userRes.map(( user ) => {
                return user.dataValues;
            });
            return res.success("USER200", {
                users: payload,
            });
        })
        .catch( System.ErrorResponse( res ) );
}
