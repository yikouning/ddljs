'use strict';
const Sequelize = require('sequelize');
// 249 北京
// const sequelize = new Sequelize(
//   'tycdpc_v2',
//   'postgres', // 用户名
//   'geoc_sport', // 密码
//   {
//     dialect: 'postgres',
//     host: '172.16.100.249',
//     port: '9999', // 端口号
//     timezone: '+08:00',
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//     define: {
//       timestamps: false,
//       underscored: true,
//       freezeTableName: true,
//     },
//     logging() { },
//   }
// );
// 143 qita
const sequelize = new Sequelize(
  'wangshaobo_0416',
  'postgres',
  'geoc_sport',
  {
    dialect: 'postgres',
    host: '172.16.100.143',
    port: '5432',
    timezone: '+08:00',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    },
    logging() { },
  }
);
module.exports = sequelize;
