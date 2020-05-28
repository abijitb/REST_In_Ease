/**
 * All Packages
 */
module.exports = {
    express                         : require('express')(),
    SwaggerExpress                  : require('swagger-express-mw'),
    Sequelize                       : require('sequelize'),
    SequelizeImport                 : require('sequelize-auto-import'),
    SqPagination                    : require('sequelize-cursor-pagination'),
    _                               : require('lodash'),
    joi                             : require('joi'),
    joiDateExtension                : require('joi-date-extensions'),
    joiPhoneExtension               : require('joi-phone-number-extensions'),
    bcrypt                          : require('bcrypt'),
    jwt                             : require('jsonwebtoken'),
    os                              : require('os'),
};
