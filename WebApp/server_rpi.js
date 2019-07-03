// Modules
var db = require("./modules/db");
var ws = require("./modules/ws");
var rs485 = require("./modules/rs485");
var xlsx = require("./modules/xlsx");
var express = require('express');

// ExpressJS
var app = express();
app.use(express.static(__dirname));

// Weather
var weatherInfo = {};
var UpdateWeather = function (w_data) {weatherInfo = w_data;};
var crawler = require("./modules/crawler");
crawler.getWeatherInfo(UpdateWeather);
setInterval(function() {crawler.getWeatherInfo(UpdateWeather);}, 60000);

// Database
data = {};

xlsx.LoadRS485();
xlsx.LoadRoom();
xlsx.LoadDevice();

// Communication
rs485.Start();
SendSerial = rs485.Send;
ws.Start();

function getRS485ById(id) {
	for(let i=0; i<data.rs485.length; i++) {
		if(data.rs485[i].id == id) {
			return(data.rs485[i].code);
		}
	}
	
	return -1;
}

function getDeviceById(id) {
	for(let i=0; i<data.devices.length; i++) {
		if(data.devices[i].id == id) {
			return(data.devices[i]);
		}
	}
	
	return -1;
}

function getDevicesByFloor(floor) {
	var devices_subset = [];
	for(let i=0; i<data.devices.length; i++) {
		if(data.devices[i].floor == floor) {
			devices_subset.push(data.devices[i]);
		}
	}
	return devices_subset;
}

function getBtnCode(id) {
	var ID = parseInt(id);

	for(let i=0; i<data.rs485.length; i++) {
		if(data.rs485[i].ID == ID)
			return(data.rs485[i].OUT_SIG);
	}

	return -1;
}

// Express Response
app.get('/query', function(req, res) {
	console.log("[INFO] 接收到Query=" + req.query.var);
	const query_var = req.query.var;

	if(query_var) {
		if(query_var == "btncode") {
			res.end(JSON.stringify(data.rs485));
		} else if(query_var == "ws") {
			res.end("ws://192.168.2.106:" + ws.ws_port);
		} else if(query_var == "weatherinfo") {
			res.end(JSON.stringify(weatherInfo));
		} else if(query_var == "control") {
			// Lvl 1
			var blocks_json = [];
			// var block = {};
			// block.name = "总览";
			// block.type = "all";
			// block.devices = data.devices;
			// blocks_json.push(block);

			var block = {};
			block.name = "1楼";
			block.type = "floor";
			block.devices = getDevicesByFloor(1);
			blocks_json.push(block);



			block = {};
			block.name = "2楼";
			block.type = "floor";
			block.devices = getDevicesByFloor(2);
			blocks_json.push(block);



			block = {};
			block.name = "4楼";
			block.type = "floor";
			block.devices = getDevicesByFloor(4);
			blocks_json.push(block);

			console.log(blocks_json);

			res.end(JSON.stringify(blocks_json));
		}
	}
});

function UpdateStatus(id) {
	if(id == 8) {
		data.status[6]
	}
}

function ToggleDevice(dev_id) {
	var device = getDeviceById(dev_id);
	console.log(device);
	if(device.status == 0) {
		rs485.Send(getRS485ById(device.controls[0]));
		device.status = 1;
		return 1;
	} else {
		rs485.Send(getRS485ById(device.controls[1]));
		device.status = 0;
		return 0;
	}
}

app.get('/rs', function(req, res) {
	var btn_id = parseInt(req.query.btn_id);
	var dev_id = parseInt(req.query.dev_id);
	var action = req.query.action;
	if(dev_id != null && action == "toggle") {
		console.log("[INFO] 设备 " + getDeviceById(dev_id).name);
		res.end(ToggleDevice(dev_id).toString());
	} else if(btn_id) {
		console.log("[INFO] HTTP收到发送RS485请求");
		var serialCode = getBtnCode(req.query.btn_id);
		console.log("[INFO] 准备发送 RS485代码 " + serialCode);
		if(serialCode != -1) {
			rs485.Send(serialCode);
			res.end("0");
			UpdateStatus(btn_id);
		} else {
			res.end("1");
		}
	}
	// console.log("[INFO] HTTP收到发送RS485请求");
	// var serialCode = getBtnCode(req.query.btn_id);
	// console.log("[INFO] 准备发送 RS485代码 " + serialCode);
	// if(serialCode != -1) {
	// 	rs485.Send(serialCode);
	// 	res.end("0");
	// 	UpdateStatus(btn_id);
	// } else {
	// 	res.end("1");
	// }
});

// Express Server
var server = app.listen(80, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("[INFO] 网页服务器已启动，请访问 http://%s:%s", host, port);
});