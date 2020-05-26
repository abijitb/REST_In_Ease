module.exports = (_this) => {
    const Sq =  _this.DBConfig();
    var model = _this.packages.SequelizeImport(Sq, './../api/models/');
    model.Op = _this.packages.Sequelize.Op;
    model.simplify = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    };
    return require('./db_relation')(model);
};
