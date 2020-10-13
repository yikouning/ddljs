'use strict';
const loader  = require('./lib/loader');
module.exports = {
 
 async tableInfo(connectInfo, tableName,index,remark) {
     const result = await loader.tableInfo(connectInfo, tableName,index,remark);
     return result;
    }

};