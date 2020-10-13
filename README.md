## 使用说明
1. 此npm包 可以拿到pg数据库中的表的信息，包括表的结构，字段，索引，注释等，类似于navicat中的DDl。
## 使用方法
1. npm i database_table_info 下载之后，直接require调用即可。例如 const tableinfo = require('table_info');
例如：const tableinfoTest = tableInfo.tableInfo(connectInfo, i.tablename, 1, 1, 1);
2. 此函数一共四个参数(connectInfo, tableName,index,remark)
分别为数据库连接信息，如{"database":"postgres","host":"127.0.0.1","password":"000000","port":"5432","username":"postgres"}；
表名，索引，字段备注信息，序列。其中connectInfo, tableName 为必填参数，其余两项为可选参数，不需要可以不传，传值传随意字符串即可。
