var SMS = require('aliyun-sms-node');
var sms = new SMS({
	AccessKeyId: 'LTAIATC5U00WQH0q',
	AccessKeySecret: '9LOMao1HSd3nzxYqXuavZKLeDeFgE7'
});
var verifyCode = require('verify-code');

//获取随机数
var GetRandomNum = function(n){
	var chars = ['0','1','2','3','4','5','6','7','8','9'];
	var res = "";
	for(var i = 0; i < n ; i ++) {
		var id = Math.ceil(Math.random()*9);
		res += chars[id];
	}
	return res;
};

//获取随机字符串
var GetRandomString = function(n){
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var res = "";
	for(var i = 0; i < n ; i ++) {
		var id = Math.ceil(Math.random()*35);
		res += chars[id];
	}
	return res;
};

//判断时间戳是否为今天
var timeStampIsToday = function(timeStamp){
	if (new Date(timeStamp).toDateString() === new Date().toDateString()) {
        return true;
    }else{
        return false;
    }
};

module.exports = {
	httpConnect:function(app){
		//发送短信验证码
	    app.all("/smsCodeAction",function(req,res){
	    	var _callback = req.query.callback,
	    		mobile = req.query.mobile;
	    	var number = GetRandomNum(6);
	    	sms.send({
				Format: 'JSON',
				Action: 'SendSms',
				TemplateParam: '{"number":'+number+'}',
				PhoneNumbers: mobile,
				SignName: 'FW音乐小屋',
				TemplateCode: 'SMS_80110091'
			}).then(function(result){
				req.session.mcode = number;
				res.type('text/javascript');
				res.send(_callback + '(' + JSON.stringify(result) + ')');
			}).catch(function(error){
				res.type('text/javascript');
				res.send(_callback + '(' + JSON.stringify(error) + ')');
			});
	    });

	    //生成验证码
	    app.all("/getVerificationCodeAction",function(req,res){
	    	var _callback = req.query.callback;
	    	var imgresult = verifyCode.Generate();
			var vcode = imgresult.code;
			var imgDataURL = imgresult.dataURL;
			var result = {"imghtml":'<img class="weui-vcode-img" src="'+imgDataURL+'">','vcode':vcode};
			req.session.vcode = vcode;
			res.type('text/javascript');
			res.send(_callback + '(' + JSON.stringify(result) + ')');
	    });
	},
	GetRandomString:function(n){
		return GetRandomString(n);
	},
	timeStampIsToday:function(timeStamp){
		return timeStampIsToday(timeStamp);
	}
};