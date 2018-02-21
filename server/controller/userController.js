var fs = require("fs"),
    eventproxy = require("eventproxy"), //同步执行控件
    ep = new eventproxy(),
    dbHelper = require("../DBHelper/dbHelper"),
    uploadHelper = require("../DBHelper/uploadHelper"),
    redisHelper = require("../DBHelper/redisHelper"),
    toolsController = require("./toolsController");

/**  
 * 提供操作表的公共路由，以供ajax访问  
 * @returns {Function}  
 */ 
module.exports = function(app){
    //登录
    app.all("/loginAction",function(req,res){
        var _callback = req.query.callback,
            name = req.query.name,
            pwd = req.query.pwd,
            vcode = req.query.vcode;
        if(vcode != req.session.vcode){
            req.session.vcode = 'S#S3EyD6M5g#U&ty';
            var result = {success: 0, flag: '验证码不正确,此次验证码已失效，请重新生成验证码进行提交'};
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
            return false;
        }
        var column = false;
        var where = 'name="'+name+'" and pwd="'+pwd+'"';
        var fields = {};
        dbHelper.findData('user',column,where,fields,function(result){  
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
        });
    });
    //注册
    app.all("/registerAction",function(req,res){
        var _callback = req.query.callback,
            name = req.query.mobile,
            pwd = req.query.pwd,
            mcode = req.query.mcode;
        if(mcode != req.session.mcode){
            req.session.mcode = 'EFnj!Q&9teH8a8td';
            var result = {success: 0, flag: '验证码不正确,此次验证码已失效，请重新获取验证码进行提交'};
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
            return false;
        }
        var column = false;
        var where = 'name='+name;
        var fields = {};
        dbHelper.findData('user',column,where,fields,function(FindResult){
            if(FindResult.success == 1){
                var result = {success: 0, flag: '此用户已存在'};
                res.type('text/javascript');
                res.send(_callback + '(' + JSON.stringify(result) + ')');
            }else{
                column = ['uuid','name','pwd','auth','createtime','updatetime'];
                var values = [];
                var this_time = new Date().getTime();
                values.push('uuid()');
                values.push('"'+name+'"');
                values.push('"'+pwd+'"');
                values.push(1);
                values.push(this_time);
                values.push(this_time);
                dbHelper.addData('user',column,values,function(AddResult){
                    if(AddResult.success == 1){
                        column = false,where = 'name="'+name+'" and pwd="'+pwd+'"';
                        dbHelper.findData('user',column,where,fields,function(FindResult2){
                            if(FindResult2.success == 1){
                                column = ['user_uuid','createtime','updatetime'];
                                values = [];
                                values.push('"'+FindResult2.result[0].uuid+'"');
                                values.push(this_time);
                                values.push(this_time);
                                dbHelper.addData('user_info',column,values,function(AddInfoResult){
                                    console.log(AddInfoResult);
                                    res.type('text/javascript');
                                    res.send(_callback + '(' + JSON.stringify(FindResult2) + ')');
                                });
                            }else{
                                res.type('text/javascript');
                                res.send(_callback + '(' + JSON.stringify(FindResult2) + ')');
                            } 
                        });
                    }else{
                        res.type('text/javascript');
                        res.send(_callback + '(' + JSON.stringify(AddResult) + ')');
                    }
                });
            }
        });
    });
    //修改密码
    app.all("/editPwdAction",function(req,res){
        var _callback = req.query.callback,
            uuid = req.query.uuid,
            pwd = req.query.pwd,
            vcode = req.query.vcode;
        if(vcode != req.session.vcode){
            req.session.vcode = 'S#S3EyD6M5g#U&ty';
            var result = {success: 0, flag: '验证码不正确,此次验证码已失效，请重新生成验证码进行提交'};
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
            return false;
        }
        var column = ['pwd','createtime','updatetime'],
            values = [];
        var this_time = new Date().getTime();
        values.push('"'+pwd+'"');
        values.push(this_time);
        values.push(this_time);
        var where = 'uuid="'+uuid+'"';
        dbHelper.updateData('user',column,values,where,function(result){  
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
        });
    });
    //签到
    app.all("/signinAction",function(req,res){
        var _callback = req.query.callback,
            uuid = req.query.uuid;
        var column = false,where = 'user_uuid="'+uuid+'"';
        var fields = {};
        var result = {};
        dbHelper.findData('user_info',column,where,fields,function(result0){
            if(result0.success == 1){
                var signin_time = result0.result[0].signin_time;
                var is_today = toolsController.timeStampIsToday(signin_time);
                if(is_today){
                    var result = {success: 2, flag: '已签到'};
                    res.type('text/javascript');
                    res.send(_callback + '(' + JSON.stringify(result) + ')');
                }else{
                    column = ['points','signin_time','createtime','updatetime'];
                    var values = [];
                    var this_time = new Date().getTime();
                    var new_points = Number(result0.result[0].points) + 10;
                    values.push(new_points);
                    values.push(this_time);
                    values.push(this_time);
                    values.push(this_time);
                    dbHelper.updateData('user_info',column,values,where,function(result){
                        result['points'] = new_points;
                        res.type('text/javascript');
                        res.send(_callback + '(' + JSON.stringify(result) + ')');
                    });
                }
            }else{
                res.type('text/javascript');
                res.send(_callback + '(' + JSON.stringify(result0) + ')');
            }
        });       
    });
    //查找用户
    app.all("/getUserAction",function(req,res){
        var _callback = req.query.callback;
        var column = false,where = 'uuid="'+req.query.uuid+'"';
        var fields = {};
        var result = {};
        dbHelper.findData('user',column,where,fields,function(result){
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
        });
    });
    //查找用户信息
    app.all("/getUserInfoAction",function(req,res){
        var _callback = req.query.callback;
        var column = false,where = 'user_uuid="'+req.query.uuid+'"';
        var fields = {};
        var result = {};
        dbHelper.findData('user_info',column,where,fields,function(result){
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
        });
    });
    //上传用户头像
    app.all("/uploadHeadImgAction",function(req,res){
        res.header("Access-Control-Allow-Origin", "*");   //设置跨域访问  
        uploadHelper.fileSingle(req,res,"userinfo-img",function(result){
            if(result.success == 1){
                var fileUrl = "/files/";
                var imgUrl = fileUrl + result.result.file.filename;
                result = {success: 1, flag: '上传成功', img:imgUrl};
            }
            res.json(result);
        });   
    });
    //保存用户信息
    app.all("/saveUserInfoActive",function(req,res){
        var _callback = req.query.callback,
            uuid = req.query.uuid,
            name = req.query.name,
            sex = req.query.sex;
        var column = ['name','sex','createtime','updatetime'],
            values = [];
        var this_time = new Date().getTime();
        values.push('"'+name+'"');
        values.push(sex);
        values.push(this_time);
        values.push(this_time);
        if(req.query.img){
            column.push('img');
            values.push('"'+req.query.img+'"');
        }
        where = 'user_uuid="'+uuid+'"';
        dbHelper.updateData('user_info',column,values,where,function(result){
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
        });
    });
    //获取历史记录
    app.all("/getHistoryAction",function(req,res){
        var _callback = req.query.callback;
        var result;
        redisHelper.getSets('history',function(errR0,resR0){
            if(errR0){
                result = {'success':0,'flag':'获取集合失败'};
                res.type('text/javascript');
                res.send(_callback + '(' + JSON.stringify(result) + ')');
            }else{
                if(resR0.length > 100){
                    var dvalue = resR0.length - 100;
                    resR0.splice(0,dvalue);
                    redisHelper.delSets('history',0,dvalue,function(e,r){});
                }
                resR0 = resR0.sort(function(a,b){return b.visittime-a.visittime});
                ep.after('getAllHistoryData', resR0.length, function (list) {
                    // var listArr = [];
                    // for(var i=0;i<list.length;i++){
                    //     if(listArr.length > 0){
                    //         for(var j=0;j<listArr.length;j++){
                    //             if(listArr[j].id == list[i].id && listArr[j].name == list[i].name && listArr[j].createtime == list[i].createtime && listArr[j].updatetime == list[i].updatetime){
                    //                 if(list[i].visittime > listArr[j].visittime){
                    //                     listArr.splice(j,1);
                    //                     listArr.push(list[i]);
                    //                 }
                    //             }else{
                    //                 listArr.push(list[i]);
                    //             }
                    //         }
                    //     }else{
                    //         listArr.push(list[i]);
                    //     }
                    // }
                    result = {'success':1,'flag':'获取记录成功','result':list};
                    res.type('text/javascript');
                    res.send(_callback + '(' + JSON.stringify(result) + ')');
                });
                for(var i=0;i<resR0.length;i++){
                    redisHelper.getObj(resR0[i],function(errR1,resR1){
                        if(errR1){
                            result = {'success':0,'flag':'获取hash对象失败'};
                            res.type('text/javascript');
                            res.send(_callback + '(' + JSON.stringify(result) + ')');
                            return false;
                        }else{
                            ep.emit('getAllHistoryData', resR1);
                        }
                    });
                }       
            }
        });
    });
    //查找系统通知
    app.all("/getNoticeListActive",function(req,res){
        var _callback = req.query.callback;
        var column = false,where = false;
        var fields = {};
        var result = {};
        dbHelper.findData('notice',column,where,fields,function(result){
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
        });
    });
    //查找系统通知详情
    app.all("/getNoticeByIdActive",function(req,res){
        var _callback = req.query.callback,
            id = req.query.id;
        var column = false,where = 'id='+id;
        var fields = {};
        var result = {};
        dbHelper.findData('notice',column,where,fields,function(result){
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(result) + ')');
        });
    });
}