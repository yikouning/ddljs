'use strict';
module.exports = {
  tableNum: async function(sequelize){
    await dataTablesNum(sequelize);
  }
}
async function dataTablesNum(sequelize){
   const dataTablesSql = `select count(*) from pg_tables where schemaname='public'`
   const dataTables = await sequelize.query(dataTablesSql).catch(err => {
    throw err;
  });
console.log(dataTables[0][0].count);
  return dataTables[0][0].count;
}


  
// }start();