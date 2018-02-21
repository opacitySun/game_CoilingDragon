var fs = require("fs"),
    dbHelper = require("../DBHelper/dbHelper"),
    uploadHelper = require("../DBHelper/uploadHelper"),
    redisHelper = require("../DBHelper/redisHelper");

var getFileContent = function(path){
    path = "./public/files/"+path;
    var content = fs.readFileSync(path,"utf-8");
    return content;
};

/**  
 * 提供操作表的公共路由，以供ajax访问  
 * @returns {Function}  
 */ 
module.exports = function(app){
    //查找音乐列表
    app.all("/getMusicList",function(req,res){
        var _callback = req.query.callback;
        var column = false,where = false;
        var fields = {};
        if(req.query.id){
            where = 'id='+req.query.id;
        }
        dbHelper.findData('music',column,where,fields,function(result){
            if(req.query.id){
                if(result.success == 1){
                    result.result.forEach(function(obj){
                        obj.lyric = getFileContent(obj.lyric);
                    });
                    var this_time = new Date().getTime();
                    var setObj = result.result[0];
                    setObj['visittime'] = this_time;
                    redisHelper.setObj('music_'+setObj.id,setObj,function(errR0,resR0){
                        var keys = ['music_'+setObj.id];
                        if(!errR0){
                            redisHelper.setSets('history',keys,function(errR1,resR1){
                                if(errR1){
                                    console.log(errR1);
                                }
                            });
                        }else{
                            console.log(errR0);
                        }
                    });
                }
            }
            if(req.query && _callback){
                res.type('text/javascript');
                res.send(_callback + '(' + JSON.stringify(result) + ')');
            }else{
                res.send(JSON.stringify(result));
            }
        });
    });

    //根据UUID查找用户的音乐列表
    app.all("/getUserMusicList",function(req,res){
        var _callback = req.query.callback,
            uuid = req.query.uuid;
        var column = false,where = 'user_uuid="'+uuid+'"';
        var fields = {};
        dbHelper.findData('user_as_music',column,where,fields,function(UASMResult){
            if(UASMResult.success == 1){
                var id_arr = [];
                UASMResult.result.forEach(function(obj){
                    id_arr.push(obj.music_id);
                });
                id_arr = id_arr.join(",");
                where = 'id in ('+id_arr+')';
                dbHelper.findData('music',column,where,fields,function(result){
                    res.type('text/javascript');
                    res.send(_callback + '(' + JSON.stringify(result) + ')');
                });
            }else{
                res.type('text/javascript');
                res.send(_callback + '(' + JSON.stringify(UASMResult) + ')');
            }
        });
    });

    //根据UUID查找是否收藏了该音乐
    app.all("/confirmCollectMusic",function(req,res){
        var _callback = req.query.callback,
            uuid = req.query.uuid,
            music_id = req.query.music_id;
        var column = false,where = 'user_uuid="'+uuid+'" and music_id='+music_id;
        var fields = {};
        dbHelper.findData('user_as_music',column,where,fields,function(result){
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
        });
    });

    //添加收藏
    app.all("/addCollectMusic",function(req,res){
        var _callback = req.query.callback,
            uuid = req.query.uuid,
            music_id = req.query.music_id;
        var column = ['user_uuid','music_id','createtime','updatetime'],
            values = [];
        var this_time = new Date().getTime();
        values.push('"'+uuid+'"');
        values.push(music_id);
        values.push(this_time);
        values.push(this_time);
        dbHelper.addData('user_as_music',column,values,function(result){
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
        });
    });

    //取消收藏
    app.all("/cancelCollectMusic",function(req,res){
        var _callback = req.query.callback,
            uuid = req.query.uuid,
            music_id = req.query.music_id;
        var where = 'user_uuid="'+uuid+'" and music_id='+music_id;
        dbHelper.removeData('user_as_music',where,function(result){
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
        });
    });
}