module.exports = {
    app                             : require('express')(),
    swaggerUI                       : require('swagger-ui-express'),
    OASTools                        : require('oas-tools'),
    requireAll                      : require('require-all'),
    JWT                             : require('jsonwebtoken'),
    Sequelize                       : require('sequelize'),
    SequelizeImport                 : require('sequelize-auto-import'),
    SqPagination                    : require('sequelize-cursor-pagination'),
    joi                             : require('joi'),
    joiDateExtension                : require('joi-date-extensions'),
    joiPhoneExtension               : require('joi-phone-number-extensions'),
    bcrypt                          : require('bcrypt'),
};
