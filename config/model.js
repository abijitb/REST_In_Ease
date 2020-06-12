/**
 * Model Configuration
 * @param this_param
 */
module.exports = ( this_param ) => {
    const Sq =  this_param.DBConfig();
    var model = this_param.dependencies.SequelizeImport(Sq, './../api/models/');
    model.Op = this_param.dependencies.Sequelize.Op;
    model.simplify = ( obj ) => {
        return JSON.parse(JSON.stringify( obj ));
    };
    return require('./db_relation')( model );
};
