var multer  = require('multer');
var storage = multer.diskStorage({  
  destination: function (req, file, cb) {  //上传路径
    cb(null, './public/files/');
  },
  filename: function (req, file, cb) {  
  	var rename = function(){
		var now = new Date();
	    // 重命名为 年+月+日+时+分+秒+5位随机数
	    return now.getFullYear() +
	      ( '0' + (now.getMonth() + 1) ).slice(-2) +
	      ( '0' + now.getDate() ).slice(-2) +
	      ( '0' + now.getHours() ).slice(-2) +
	      ( '0' + now.getMinutes() ).slice(-2) +
	      ( '0' + now.getSeconds() ).slice(-2) +
	      parseInt(10000 + Math.random() * 90000);
	};
	var typeItems = file.mimetype.split('/');
	rename = rename() + "." + typeItems[1];
    cb(null, rename);
  }
});
var multerConfig = {
	storage:storage,
	limits: {
        fileSize: 16*1024*1024 // Max file size in bytes (16 MB)
    },
    fileFilter: function (req, file, cb) {
        var mimetypes = (['text/*', 'image/*', 'video/*', 'audio/*', 'application/zip']).join(',');
        var testItems = file.mimetype.split('/');
        if ((new RegExp('\\b' + testItems[0] + '/\\*', 'i')).test(mimetypes) || (new RegExp('\\*/' + testItems[1] + '\\b', 'i')).test(mimetypes) || (new RegExp('\\b' + testItems[0] + '/' + testItems[1] + '\\b', 'i')).test(mimetypes)) {
            cb(null, true);
        } else {
            return cb(new Error('Only image, plain text, audio, video and zip format files are allowed!'), false);
        }
    }
};

/** 
 * 接收一个叫做<fieldname>名字的附件，该附件将被保存到req.file属性中
 * Accept a single file with the name fieldname. The single file will be stored in req.file.
 * @param req 请求
 * @param res 响应
 * @param fieldname 所接收附件的名字
 * @param callback 回调方法 
 */ 
exports.fileSingle = function(req,res,fieldname,callback){
	var upload = multer(multerConfig).single(fieldname);
	var result;
	upload(req, res, function(err){
		if(err){
			console.log(err);
			result = {"success":0,"flag":err};
		}else{
			console.log(req.file);
			result = {"success":1,"flag":'success',"result":req};
		}
		callback(result);
	});
}

/** 
 * 接收一个所有附件的名字是<fieldname>的附件数组，如果附件的数量大于<maxCountfiles>则抛出异常。文件数组将被储存到req.files属性中
 * Accept an array of files, all with the name fieldname. Optionally error out if more than maxCountfiles are uploaded. The array of files will be stored in req.files.
 * @param req 请求
 * @param res 响应
 * @param fieldname 所接收附件的名字
 * @param maxnum 允许的最大数量
 * @param callback 回调方法 
 */ 
exports.fileArray = function(req,res,fieldname,maxnum,callback){
	var upload = multer(multerConfig).array(fieldname,maxnum);
	upload(req, res, function(err){
		if(err){
			console.log(err);
			return;
		}else{
			console.log(req.files);
			callback(req);
		}
	});
}

/** 
 * 接收所有名称的附件，附件将被保存到req.files属性中（是一个对象数组）
 * Accept a mix of files, specified by fields. An object with arrays of files will be stored inreq.files.fields should be an array of objects with name and optionally a maxCount.
 * @param req 请求
 * @param res 响应
 * @param fieldsarray 配置数组,例如：
   [
	{ name: 'avatar', maxCount: 1 },
	{ name: 'gallery', maxCount: 8 }
   ]
 */ 
exports.fileFields = function(req,res,fieldsarray,callback){
	var upload = multer(multerConfig).fields(fieldsarray);
	upload(req, res, function(err){
		if(err){
			console.log(err);
			return;
		}else{
			console.log(req.files);
			callback(req);
		}
	});
}

/** 
 * 接收所有提交的数据，保存到req.files属性中
 * Accepts all files that comes over the wire. An array of files will be stored in req.files.
 * @param req 请求
 * @param res 响应
 */ 
exports.fileAny = function(req,res,callback){
	var upload = multer(multerConfig).any();
	upload(req, res, function(err){
		if(err){
			console.log(err);
			return;
		}else{
			console.log(req.files);
			callback(req);
		}
	});
}