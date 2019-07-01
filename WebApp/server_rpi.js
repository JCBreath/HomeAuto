// Modules
var db = require("./modules/db");
var ws = require("./modules/ws");
var rs485 = require("./modules/rs485");
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
data.devices = [
	{
		id: 0,
		name: "客厅吊灯",
		type: "relay",
		on: 44,
		off: 45,
		status: 0
	},
	{
		id: 1,
		name: "客厅餐厅灯带",
		type: "relay",
		on: 62,
		off: 63,
		status: 0
	},
	{
		id: 2,
		name: "茶室灯带",
		type: "relay",
		on: 54,
		off: 55,
		status: 0
	},
	{
		id: 3,
		name: "2楼房间吊灯",
		type: "relay",
		on: 48,
		off: 49,
		status: 0
	},
	{
		id: 4,
		name: "4楼房间吊灯",
		type: "relay",
		on: 6,
		off: 7,
		status: 0
	},
	{
		id: 5,
		name: "楼梯顶吊灯",
		type: "relay",
		on: 8,
		off: 9,
		status: 0
	}
];
db.Load();

// Communication
rs485.Start();
SendSerial = rs485.Send;
ws.Start();

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
			var block = {};
			block.name = "1楼";
			block.type = "normal";
			block.devices = data.devices.slice(0,2);
			blocks_json.push(block);

			block = {};
			block.name = "2楼";
			block.type = "normal";
			block.devices = data.devices.slice(2,4);
			blocks_json.push(block);

			block = {};
			block.name = "4楼";
			block.type = "normal";
			block.devices = data.devices.slice(4,6);
			blocks_json.push(block);

			// var controls = [];

			// for(var i=0; i<data.devices; i++) {
			// 	var control = {};

			// 	control.name = "客厅吊灯";
			// 	control.type = "relay";
			// 	control.codes = [44, 45];
			// 	control.status = 0;
			// 	controls.push(control);
			// }

			// control.name = "客厅吊灯";
			// control.type = "relay";
			// control.codes = [44, 45];
			// control.status = 0;
			// controls.push(control);

			// control = {};
			// control.name = "餐厅灯带";
			// control.type = "relay";
			// control.codes = [62, 63];
			// control.status = 0;
			// controls.push(control);

			// block.controls = controls;
			// blocks_json.push(block);

			// // Lvl 2
			// block = {};
			// block.name = "2楼";
			// block.type = "normal";
			
			// controls = [];
			// control = {};
			// control.name = "茶室灯带";
			// control.type = "relay";
			// control.codes = [54, 55];
			// control.status = 0;
			// controls.push(control);

			// control = {};
			// control.name = "房间吊灯";
			// control.type = "relay";
			// control.codes = [48, 49];
			// control.status = 0;
			// controls.push(control);

			// block.controls = controls;
			// blocks_json.push(block);

			// // Lvl 4
			// block = {};
			// block.name = "4楼";
			// block.type = "normal";
			
			// controls = [];
			// control = {};
			// control.name = "房间吊灯";
			// control.type = "relay";
			// control.codes = [6, 7];
			// control.status = 0;
			// controls.push(control);

			// control = {};
			// control.name = "楼梯顶吊灯";
			// control.type = "relay";
			// control.codes = [8, 9];
			// control.status = 0;
			// controls.push(control);

			// block.controls = controls;
			// blocks_json.push(block);

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
	var device = data.devices[dev_id];
	if(device.status == 0) {
		rs485.Send(getBtnCode(device.on));
		device.status = 1;
		return 1;
	} else {
		rs485.Send(getBtnCode(device.off));
		device.status = 0;
		return 0;
	}
}

app.get('/rs', function(req, res) {
	var dev_id = parseInt(req.query.dev_id);
	var action = req.query.action;
	if(dev_id != null && action == "toggle") {
		console.log("[INFO] 设备 " + data.devices[dev_id].name);
		res.end(ToggleDevice(dev_id).toString());
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