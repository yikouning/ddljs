'use strict';
const { isArrowFunction } = require("typescript");
const Database = require("../util/db");
module.exports = {
async tableInfo(connectInfo, tableName,index,remark) {
        // 连接数据库
        const sequelize = await Database.database(connectInfo)
       
           // 获取数据表的结构
        const tableInfoSql = `			
        select string_agg( ('"'||attname||'"'||'   '||type||'   '||'DEFAULT'||'   '||column_default),',') as "tableInfo" 
        from(
        select * from (select g.*,COALESCE( n.column_default,'null')as column_default
        from (
        select a.attnum,a.attname,concat_ws('',t.typname,SUBSTRING(format_type(a.atttypid,a.atttypmod) from 
        '\\(.*\\)')) as type from pg_class c, pg_attribute a , pg_type t
        where  c.relname = '${tableName}' and a.attnum>0 and a.attrelid = c.oid and a.atttypid = t.oid ) as g 
        left join  	
        information_schema.columns AS n  on g.attname = n.column_name  where n.table_name = '${tableName}' order by attnum) as m  
        where column_default not ilike 'nextval%'
        )as t`;
        const tableInfo = await sequelize.query(tableInfoSql);

        //   获取主键
        const getPkeySql = `
        select pg_constraint.conname as pk_name,pg_attribute.attname as colname from
        pg_constraint  inner join pg_class
        on pg_constraint.conrelid = pg_class.oid
        inner join pg_attribute on pg_attribute.attrelid = pg_class.oid 
        and  pg_attribute.attnum = pg_constraint.conkey[1]
        where pg_class.relname = '${tableName}'
        and pg_constraint.contype='p'`;
        const getPkey = await sequelize.query(getPkeySql);

        // 获取序列
        let sequenceArr = [];
        const getSequenceSql = `
        SELECT column_name,column_default
        FROM information_schema.columns
        WHERE (table_schema, table_name) = ('public', '${tableName}') and column_default like 'nextval%'
        ORDER BY ordinal_position;`
        const getSequence = await sequelize.query(getSequenceSql);
        if(getSequence[0].length>0){
        for (const i of getSequence[0]){
         // sequenceArr.push(`CREATE SEQUENCE ${i.column_default.substring(10,i.column_default.length-13)} INCREMENT BY 1 MINVALUE 1 NO MAXVALUE START WITH 1`)
         sequenceArr.push(`"${i.column_name}"  SERIAL4`) ;
      }
         }
         if(sequenceArr.length!=0){
            sequenceArr = sequenceArr.join(';')+',';
         }else{
            sequenceArr = sequenceArr.join(';');
         }

        // 获取字段备注信息
        const getRemarkSql = `select string_agg( ('COMMENT ON COLUMN "public".'||'"'||relname||'"'||'.'||'"'||attname||'"'||' IS '||''''||description||''''),';') as "remark" 
        from(
        select * from (select g.*,COALESCE( n.column_default,'null')as column_default
        from (
        select a.attnum,c.relname,a.attname,concat_ws('',t.typname,SUBSTRING(format_type(a.atttypid,a.atttypmod) from '\\(.*\\)')) as type,d.description 
        from
        pg_class c, pg_attribute a , pg_type t, pg_description d
        where  c.relname = '${tableName}' and a.attnum>0 and a.attrelid = c.oid and a.atttypid = t.oid and  d.objoid=a.attrelid and d.objsubid=a.attnum) as g 
        left join  	
        information_schema.columns AS n  on g.attname = n.column_name  where n.table_name = '${tableName}' order by attnum) as m
        )as t`;
        const getRemark = await sequelize.query(getRemarkSql);

          // 获取索引
        const tableIndexSql = `select string_agg(indexdef ,';') as index from pg_indexes where tablename='${tableName}';`;
        const tableIndex = await sequelize.query(tableIndexSql);

        let result ;
        if(getPkey[0].length>0&&sequenceArr.length===0){
         result=  `CREATE TABLE "${tableName}"(${sequenceArr}${tableInfo[0][0].tableInfo}, CONSTRAINT "${getPkey[0][0].pk_name}" PRIMARY KEY ("${getPkey[0][0].colname}"));`
        }else{
         result=  `CREATE TABLE "${tableName}"(${sequenceArr}${tableInfo[0][0].tableInfo});`
        }
        
        if(index){
           if(tableIndex[0][0].index!==null){
            result+=tableIndex[0][0].index;
           }
        }
        if(remark){
         if(getRemark[0][0].remark!==null){
            result+=getRemark[0][0].remark;
           }
        }
        console.log(result);
        return result;
        
    }
}