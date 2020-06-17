'use strict';
// const sequelize = require('./sequelize');

// async function start() {
  // module.exports = {
    async function dataTablesNum(sequelize){
   const dataTablesSql = `select count(*) from pg_tables where schemaname='public'`
   const dataTables = await sequelize.query(dataTablesSql).catch(err => {
    throw err;
  });
console.log(dataTables[0][0].count);
  return dataTables[0][0].count;
}
const sequelize = require('./sequelize');

dataTablesNum(sequelize);

  
// }start();