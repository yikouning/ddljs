'use strict';
const Sequelize = require('sequelize')
module.exports = {
async database(dbInfo){

let sequelize = new Sequelize(
    dbInfo.database,
    dbInfo.username,
    dbInfo.password,
  {
    dialect: 'postgres',
    host: dbInfo.host,
    port: '5432',
    timezone: '+08:00',
      pool: {
        max: 2,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: false,
        underscored: true,
        freezeTableName: true
      },
      dialect: dbInfo.dialect || 'postgres'
    }
);

return sequelize;
}
};