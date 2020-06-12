/**
 * Sequelize Configuration
 * @param this_param
 */
module.exports = ( this_param ) => {
    return new this_param.dependencies.Sequelize(
        process.env.DB_NAME || 'test',
        process.env.DB_USER || 'root',
        process.env.DB_PASS || '', {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
            port: process.env.DB_PORT || 3306,
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            logging: false,
        }
    )
};
