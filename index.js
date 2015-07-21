var req = require('request');
var moment = require('moment');
var crypto = require('crypto');

// 请替换以下参数
var AccountID = 'YOUR AccountID'; 
var AccountKey = 'YOUR AccountKey';
var AppID = 'YOUR AppID';

var baseURL = 'https://api.ucpaas.com/2014-06-30/Accounts/';
var sendSMS = '/Messages/templateSMS';

var now = new moment().format('YYYYMMDDHHmmss');

var sign = crypto.createHash('md5').update(AccountID + AccountKey + now).digest('hex').toUpperCase();

var auth = AccountID + ':' + now;
var buffer = new Buffer(auth);
auth = buffer.toString('base64');

var options = {
	url: baseURL  + AccountID + sendSMS + '?sig=' + sign,
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Authorization': auth
	},

	json: {
		"templateSMS" : {
		    "appId"       : AppID,
		    "param"       : "8080,10",     // 传入模板的参数，参数用英文逗号分割
		    "templateId"  : "10052",       // 模板ID
		    "to"          : "13500000000"  // 你的手机号码，应用未上线时只能使用测试手机号
	    }
	}
}

// console.log(options);

req(options, function(err, res, body){
	if (err) {
		console.log(err);
		return;
	}

	console.log(res.statusCode);
	console.log(body);
})
