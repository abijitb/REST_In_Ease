'use strict';
const config = require('../config')();
const { DB_TYPE, DB_TABLES } = config.state;
var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable(DB_TABLES.USER, {
    id: { type: DB_TYPE.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DB_TYPE.STRING, notNull: true },
    last_name: { type: DB_TYPE.STRING, notNull: true },
    email: { type: DB_TYPE.STRING, length: 100, notNull: true },
    phone_number: { type: DB_TYPE.STRING, notNull: true },
    password: { type: DB_TYPE.STRING, notNull: true },
    image: { type: DB_TYPE.TEXT, notNull: false },
    createdAt: { type: DB_TYPE.DATE_TIME, notNull: false },
    updatedAt: { type: DB_TYPE.DATE_TIME, notNull: false },
    deletedAt: { type: DB_TYPE.DATE_TIME, notNull: false }
  });
};

exports.down = function(db) {
  return db.dropTable(DB_TABLES.USER);
};

exports._meta = {
  "version": 1
};
