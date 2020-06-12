const config            = require('../../config')();
const Model             = config.model();
const {
    DB_TABLES,
}                       = config.state;
const User              = Model[ DB_TABLES.USER ];

module.exports = {
    GetUserDetails                  : GetUserDetails,
};

function GetUserDetails ( req, res ) {
    console.log("req.query('username')", req.query('username'));
    return res.success("USER200", {
        username: req.query('username'),
    });
}
