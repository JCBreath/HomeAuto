var http = require('http');
var iconv = require('iconv-lite');
var request = require('request');
//var cheerio = require('cheerio');
var url = 'http://d1.weather.com.cn/weather_index/101210401.html?_=1549535812225'; 

exports.getWeatherInfo = function (callback) {
	let options = {
		hostname: 'd1.weather.com.cn',
		port: 80,
		path: '/weather_index/101210401.html?_=1549535812225',
		method: 'GET',
		headers: {
			'Accept-Encoding':'utf-8',
			'Referer':'http://www.weather.com.cn/'
		}
	}
	let html = '';
	let req = http.get(options, function(res) {
		res.setEncoding("utf-8");
		res.on('data', function(chunk) {
			html += chunk;
		});
		res.on('end', function() {
			
			console.log("[INFO] Weather information obtained successfully.");
			callback(JSON.parse(html.split(';')[0].split('=')[1]));
		})
	});
	req.on('error', function(e) {
	    console.log('[ERROR] : ' + e.message);
	});
	
	
}