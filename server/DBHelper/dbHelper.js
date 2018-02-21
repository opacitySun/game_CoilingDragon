var db = require('./db');

/** 
 * 公共Add方法 
 * @param table 要操作表 
 * @param column 字段 
 * @param values 字段值
 * @param callback 回调方法 
 */ 
exports.addData = function(table,column,values,callback){
    if(column instanceof Array){column = column.join(",");}
    if(values instanceof Array){values = values.join(",");}
    var sql = 'insert into '+table+'('+column+') values('+values+')';
    db.query(sql,function(error,result){
        if(error) {
            console.log(error);
            callback({success:0,flag:"save data fail"});  
        } else {  
            console.log('save success');  
            callback({success:1,flag:"save data success"});  
        }
    });
}

/** 
 * 公共update方法 
 * @param table 要操作表
 * @param column 字段
 * @param values 字段值
 * @param where 根据什么修改 例如：id='1'
 * @param callback 
 */  
exports.updateData = function(table,column,values,where,callback) {
    var sets = [];
    for(var i=0;i<column.length;i++){
        for(var j=0;j<values.length;j++){
            if(j == i){
                var set = column[i]+'='+values[j];
                sets.push(set);
            }
        }
    }
    sets = sets.join(",");
    var sql = 'update '+table+' set '+sets+' where '+where;
    db.query(sql,function(error,result){
        if(error) {  
            console.log(error);  
            callback({success:0,flag:"update data fail"});  
        } else {  
            console.log('update success!');  
            callback({success:1,flag:"update data success"});
        }
    }); 
}  

/** 
 * 公共remove方法 
 * @param table 
 * @param where 
 * @param callback 
 */  
exports.removeData = function(table,where,callback) {
    var sql = 'delete from '+table+' where '+where;
    db.query(sql,function(error,result){
        if (error) {
            console.log(error);
            callback({success: 0, flag: "remove data fail"});
        } else {
            console.log('remove success!');
            callback({success: 1, flag: "remove data success"});
        }
    });
}  

/** 
 * 公共find方法 非关联查找 
 * @param table 
 * @param column 
 * @param where
 * @param fields 分页信息
 * @param callback 
 */  
exports.findData = function(table,column,where,fields,callback) {
    if(column){
        if(column instanceof Array){column = column.join(",");}
    }else{
        column = '*';
    }

    var sql = 'select '+column+' from '+table;
    if(where){
        sql += ' where '+where;
    }

    sql += ' order by updatetime desc';

    var skip,limit;
    if(fields.currentPage){
        skip = (fields.currentPage-1)*fields.pageSize;
        limit = Number(fields.pageSize);
    }else{
        skip = 0;
        limit = 1000;
    }
    sql += ' limit '+skip+','+limit;

    db.query(sql,function(error,result){
        if(error) {
            console.log(error);
            callback({success: 0, flag: "find data fail"});
        } else {
            if(result.length!=0){
                console.log('find success!');
                callback({success: 1, flag: "find data success",result:result,total:result.length});
            }else{
                console.log('find fail:no this data!');  
                callback({success: 0, flag: 'find fail:no this data!'});  
            }
        }
    });
}