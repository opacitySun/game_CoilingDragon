var redis = require('redis'),
	RDS_PORT = 6379,        //端口号
    RDS_HOST = '127.0.0.1',    //服务器IP
    RDS_PWD = 'xJmcMhmgGoYlcA69',	//redis密码
    RDS_OPTS = {auth_pass:RDS_PWD},   //设置项
    client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);

// redis 链接错误
var isError = function(){
	client.on("error", function(error) {
	    if(error){
	    	console.log(error);
	    	return error;
	    }else{
	    	return false;
	    }
	});
};

// redis 链接成功
client.on("ready", function(res) {
    console.log('success');
});

module.exports = {
	//设置单个key和value
	setSingle:function(key,val,callback){
		if(!isError()){
			client.set(key,val,function(err,res){
				callback(err, res);
				//client.quit();
			});
		}else{
			callback(isError(), null);
		}
	},
	//根据key获取单个value
	getSingle:function(key,callback){
		if(!isError()){
			client.get(key,function(err,res){
				callback(err, res);
				//client.quit();
			});
		}else{
			callback(isError(), null);
		}
	},
	//设置对象
	setObj:function(hash,obj,callback){
		if(!isError()){
			client.hmset(hash, obj, function(err,res){
				callback(err, res);
				//client.quit();
			});
		}else{
			callback(isError(), null);
		}
	},
	//获取对象
	getObj:function(hash,callback){
		if(!isError()){
			client.hgetall(hash, function(err,res){
				callback(err, res);
				//client.quit();
			});
		}else{
			callback(isError(), null);
		}
	},
	//设置集合,zadd方法接收数组作为设定值的参数,数组中数据顺序为[score1, key1, score2, key2,...]的形式。
	setSets:function(hash,keys,callback){
		if(!isError()){
			var sets = [];
			for(var score=0;score<keys.length;score++){
				for(var i=0;i<keys.length;i++){
					sets.push(score);
					sets.push(keys[i]);
				}
			}
			client.zadd(hash, sets, function(err, res) {
				callback(err, res);
				//client.quit();
			});
		}else{
			callback(isError(), null);
		}
	},
	//获取集合
	getSets:function(hash,callback){
		if(!isError()){
			client.zrange(hash, 0, -1, function(err, res) {
				callback(err, res);
				//client.quit();
			});
		}else{
			callback(isError(), null);
		}
	},
	//删除集合
	delSets:function(hash,start,end,callback){
		if(!isError()){
			client.zrem(hash, start, end, function(err, res) {
				callback(err, res);
				//client.quit();
			});
		}else{
			callback(isError(), null);
		}
	},
	//设置lists列表
	setLists:function(key,arr,callback){
		if(!isError()){
			client.del(key, function(error, response) {
				client.rpush(key, arr, function(err, res) {
					callback(err, res);
					//client.quit();
				});
			});
		}else{
			callback(isError(), null);
		}
	},
	//向lists尾部添加新的数据
	rpushLists:function(key,arr,callback){
		if(!isError()){
			client.rpush(key, arr, function(err, res) {
				callback(err, res);
				//client.quit();
			});
		}else{
			callback(isError(), null);
		}
	},
	//向lists头部添加新的数据
	lpushLists:function(key,arr,callback){
		if(!isError()){
			client.lpush(key, arr, function(err, res) {
				callback(err, res);
				//client.quit();
			});
		}else{
			callback(isError(), null);
		}
	},
	//获取lists
	getLists:function(key,callback){
		if(!isError()){
			client.lrange(key, 0, -1, function(err, res) {
				callback(err, res);
				//client.quit();
			});
		}else{
			callback(isError(), null);
		}
	},
	//删除存储的key
	delKey:function(key,callback){
		if(!isError()){
			client.del(key, function(err, res) {
				callback(err, res);
			});
		}else{
			callback(isError(), null);
		}
	}
};

