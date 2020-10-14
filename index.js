'use strict';
const main  = require('./lib/main');
 async function ddljs(connectInfo, tableName,index,remark) {
     const result = await main.tableInfo(connectInfo, tableName,index,remark);
     return result;
}
module.exports = ddljs;