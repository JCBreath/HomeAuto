// Modules
// var db = require("./modules/db");
// var ws = require("./modules/ws");
var rs485 = require("./modules/rs485");
var xlsx = require("./modules/xlsx");
var mongo = require("./modules/mongo");
var socket = require("./modules/socket");
var express = require('express');
var fs = require("fs");
var multer = require('multer');

// Commandline Parameter
var para_list = process.argv.slice(2);
console.log(para_list);
var demo = false;
var load_status = false;

const device_address = "18590000";

// ExpressJS
var app = express();
app.use(express.static(__dirname));

// Weather
var weatherInfo = {};
var UpdateWeather = function (w_data) {weatherInfo = w_data;};
var crawler = require("./modules/crawler");
crawler.getWeatherInfo(UpdateWeather);
setInterval(function() {crawler.getWeatherInfo(UpdateWeather);}, 60000);

// Update IP for redirection
// DISABLED FOR DEMO
if(!demo)
	socket.Connect("www.jcbreath.net", 18867, function(){});

// Upload XLXS
var createFolder = function(folder){
	try{
		fs.accessSync(folder); 
	}catch(e){
		fs.mkdirSync(folder);
	} 
};
	
var uploadFolder = './upload/';

createFolder(uploadFolder);


var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadFolder);
	},
	filename: function (req, file, cb) {
		let suffix=file.mimetype.split('/')[1];
		cb(null, file.originalname);
	}
});

var upload = multer({ storage: storage })
 
app.post('/profile',upload.single('file'),function(req,res,next){
	//req.body contains the text fields
	console.log("[INFO] File " + req.file.originalname + " uploaded.");
	// res.end(req.file.buffer);
	// console.log(req.file.buffer.toString().length);

	xlsx.LoadXLSX("./upload/" + req.file.originalname);
	data.rs485 = xlsx.LoadSheet("RS485", 1, ["id", "name", "code"]);
	data.devices = xlsx.LoadSheet("DEVICE", 1, ["id", "name", "type"]);
	data.rooms = xlsx.LoadSheet("ROOM", 1, ["id", "name", "floor"]);
	data.switches = xlsx.LoadSwitch();
	InitDevices();

	res.end('ok');
})

// Database
data = {};

// Excel (temp)
// data.switches = xlsx.LoadSheet("SWITCH", 1, ["id", "name", "cases+"]);
// xlsx.LoadXLSX("./upload/data.xlsx");
function LoadDataXLSX() {
	fs.exists("./upload/data.xlsx", function(exists){
		try {
			if(exists) {
				xlsx.LoadXLSX("./upload/data.xlsx");
				console.log("[INFO] XLSX found at upload.");
			}
			else {
				xlsx.LoadXLSX("./data.xlsx");
				console.log("[INFO] XLSX found at root.");
			}
			data.rs485 = xlsx.LoadSheet("RS485", 1, ["id", "name", "code"]);
			data.devices = xlsx.LoadSheet("DEVICE", 1, ["id", "name", "type"]);
			data.rooms = xlsx.LoadSheet("ROOM", 1, ["id", "name", "floor"]);
			data.switches = xlsx.LoadSwitch();
			InitDevices();
		} catch {

		}
	});
}

for(var i=0; i<para_list.length; i++) {
	if(para_list[i] == "-d") {
		demo = true;
		console.log("[INFO] Demo on.");
	} else if(para_list[i] == "-a") {
		setInterval(SaveData, 60000, "Interval");
		console.log("[INFO] Autosave on.");
	} else if(para_list[i] == "-j") {
		LoadData();
		console.log("[INFO] Load json on.");
	} else if(para_list[i] == "-x") {
		LoadDataXLSX();
		console.log("[INFO] Load xlsx on.");
	}
}


function SaveData() {
	fs.writeFile("data.json", JSON.stringify(data), function(err) {
		if(err)
			console.log(err);
		else {
			console.log("[INFO] Data file saved");
		}
	});
}

function LoadData(callback) {
	fs.readFile("data.json", function (err, _data) {
		if(err)
			console.log(err);
		else {
			data = JSON.parse(_data);
			console.log("[INFO] Data loaded from data.json");
		}
	});
}


function InitData() {
	InitDevices();
}

// LoadData(InitData);

// Mongo (final)
// mongo.Find("rs485", {}, function(obj) {data.rs485 = obj; });
// mongo.Find("devices", {}, function(obj) {data.devices = obj;});
// mongo.Find("rooms", {}, function(obj) {data.rooms = obj;});

// mongo.InsertList("rs485", data.rs485, undefined);
var Print = function(obj) {console.log(obj);};


// xlsx.ExportSheet(data.devices, "F", "DEVICE", "test.xlsx");

// function InitSwitches() {
// 	for(var i=0; i<data.switches.length; i++) {
// 		data.switches[i].room = getRoomById(parseInt(data.switches[i].id / 100));
// 	}
// 	console.log(data.switches);
// }

function InitDevices() {
	for(var i=0; i<data.devices.length; i++) {
		data.devices[i].floor = parseInt(data.devices[i].id / 1000);
		data.devices[i].room = getRoomById(parseInt(data.devices[i].id / 100)).name;
		data.devices[i].status = 0;
		if(getRS485ById(data.devices[i].id * 100) == -1) {
			data.devices[i].status = -1;
			console.log("[INFO] 设备 " + data.devices[i].floor + "楼" + data.devices[i].room + data.devices[i].name + " 不可用.");
		}
	}
	console.log("[INFO] Device list initialized.")
}

// data.rs485 = xlsx.LoadRS485();
// data.rooms = xlsx.LoadRoom();
// data.devices = xlsx.LoadDevice();

// Communication

function FormatHexStr(str) {
	var re = new RegExp("\\w{1,2}","g");
	ma = str.match(re);
	
	return ma.join(' ');
}

function OnData(recv_data) {
	var recv_str = FormatHexStr(recv_data.toUpperCase());
	console.log('[INFO] 接收到RS485代码 '+ recv_str);
	var str = recv_data.toUpperCase();
	var dev_addr = str.substring(0, 8);
	if(dev_addr == device_address) {
		var func_code = str.substring(8, 10);
		var end = str.substring(16, 18);
		if(func_code == "0A" && end == "0F") {
			var switch_id = str.substring(10, 14);
			var switch_case = parseInt(str.substring(14, 16));
			console.log("[INFO] 按钮" + switch_id + "状态" + (switch_case));
			console.log(data.switches);
			if(data.switches) {
				try {
					var _switch = data.switches[switch_id];
					console.log(_switch.cases[switch_case]);
					var _switch_case = _switch.cases[switch_case];
					console.log(_switch_case);
					console.log("[INFO] 开关 " + _switch.id + "状态" + _switch_case.name + "已激活");
					var action_type = _switch_case.code.substring(0, 1);
					
					if(action_type == 'D') {
						var action_code = _switch_case.code.substring(1, 7);
						if(action_code.substring(4, 6)) {
							SwitchDevice(action_code.substring(0, 4), action_code.substring(4, 6));
						} else {
							ToggleDevice(action_code.substring(0, 4));
						}
					} else if(action_type == 'S') {
	
					}
				} catch {

				}
			}
		}
	}
}

// DISABLED FOR DEMO
if(!demo) {
	rs485.Start(OnData);
	SendSerial = rs485.Send;
}

// ws.Start();

function getRS485ById(id) {
	for(let i=0; i<data.rs485.length; i++) {
		if(data.rs485[i].id == id) {
			return(data.rs485[i].code);
		}
	}
	
	return -1;
}

// USE DEVICE ID
function getRS485ByDevice(device) {
	var lower = device * 100;
	var upper = lower + 100;
	var rs485_subset = [];
	for(let i=0; i<data.rs485.length; i++) {
		if(data.rs485[i].id >= lower && data.rs485[i].id < upper) {
			rs485_subset.push(data.rs485[i]);
		}
	}
	return rs485_subset;
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
		console.log(data.devices[i]);
		if(data.devices[i].floor == floor) {
			devices_subset.push(data.devices[i]);
		} 
	}
	return devices_subset;
}

// Use room id
function getDevicesByRoom(room) {
	var lower = room * 100;
	var upper = lower + 100;
	var devices_subset = [];
	for(let i=0; i<data.devices.length; i++) {
		// if(data.devices[i].id >= lower && data.devices[i].id < upper && data.devices[i].name.indexOf("灯") != -1) {
		if(data.devices[i].id >= lower && data.devices[i].id < upper) {
			devices_subset.push(data.devices[i]);
		}
	}
	return devices_subset;
}

function getRoomById(id) {
	for(let i=0; i<data.rooms.length; i++) {
		if(data.rooms[i].id == id) {
			return data.rooms[i];
		}
	}
	
	return -1;
}

function getRoomsByFloor(floor) {
	var rooms_subset = [];
	for(let i=0; i<data.rooms.length; i++) {
		if(data.rooms[i].floor == floor) {
			rooms_subset.push(data.rooms[i]);
		}
	}
	return rooms_subset;
}

function getBlocks(user) {

}

function getSwitchById(id) {
	for(let i=0; i<data.switches.length; i++) {
		if(data.switches[i].id == id) {
			return data.switches[i];
		}
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
		// } else if(query_var == "ws") {
		// 	res.end("ws://192.168.2.106:" + ws.ws_port);
		} else if(query_var == "weatherinfo") {
			res.end(JSON.stringify(weatherInfo));
		} else if(query_var == "control") {
			const floor = req.query.floor;

			var blocks_json = [];
			if(floor) {
				console.log(floor);
				var rooms = getRoomsByFloor(floor);
				for(var i=0; i<rooms.length; i++) {
					if(rooms[i].floor == floor) {
						var block = {};
						block.name = rooms[i].name;
						block.type = "room";
						block.devices = getDevicesByRoom(rooms[i].id).sort(function (item1, item2) {
							return item1.name.localeCompare(item2.name, 'zh');
						});
						if(block.devices.length > 0) {
							blocks_json.push(block);
						}
					}
				}
			} else {
				
				// var block = {};
				// block.name = "总览";
				// block.type = "all";
				// block.devices = data.devices;
				// blocks_json.push(block);


				for(var i=1; i<5; i++) {
					var rooms = getRoomsByFloor(i);
					for(var j=0; j<rooms.length; j++) {
						if(rooms[j].floor == i) {
							var block = {};
							block.name = i+"楼"+rooms[j].name;
							block.type = "room";
							block.devices = getDevicesByRoom(rooms[j].id).sort(function (item1, item2) {
								return item1.name.localeCompare(item2.name, 'zh');
							});
							if(block.devices.length > 0) {
								blocks_json.push(block);
							}
								
						}
					}
				}
			}
			console.log(blocks_json);
			// res.end(JSON.stringify(blocks_json));
			res.json(blocks_json);
		}
	}
});

function UpdateStatus(id) {
	if(id == 8) {
		data.status[6]
	}
}

// Turn on when off, turn off in other cases
function ToggleDevice(dev_id) {
	var device = getDeviceById(dev_id);
	// console.log(device);
	if(device.status == 0) {
		return SwitchDevice(dev_id, 1);
	} else {
		return SwitchDevice(dev_id, 0);
	}
}

function SwitchDevice(dev_id, control_index) {
	var device = getDeviceById(dev_id);
	var ci_str = control_index.toString();
	
	if(ci_str == "") {
		ToggleDevice(dev_id);
		return control_index;
	}

	// if index < 10, make it two digits (example: 1 -> 01)
	if(ci_str.length < 2) {
		ci_str = "0" + ci_str;
	}
	
	// RS485 ID = DEVICE ID + CONTROL INDEX
	// DISABLED FOR DEMO
	if(!demo)
		rs485.Send(getRS485ById(dev_id.toString() + ci_str));
	device.status = control_index;
	return control_index;
}

app.get('/rs', function(req, res) {
	var btn_id = parseInt(req.query.btn_id);
	var dev_id = parseInt(req.query.dev_id);
	var code = parseInt(req.query.code);
	var action = req.query.action;
	if(dev_id != null && action == "toggle") {
		console.log("[INFO] 设备 " + getDeviceById(dev_id).name);
		res.end(ToggleDevice(dev_id).toString());
	} else if(code != null && action == "switch") {
		console.log("[INFO] 设备 " + getDeviceById(parseInt(code / 100)).name);
		res.end(SwitchDevice(parseInt(code / 100), code - parseInt(code / 100) * 100).toString());
	}
});

app.get('/admin/li', function(req, res) {
	var show = req.query.show;
	var floor = parseInt(req.query.floor);
	var room = parseInt(req.query.room);
	var device = parseInt(req.query.device);

	if(show != null) {
		if(show == "floor") {
			res.end(JSON.stringify([1, 2, 3, 4]));
		} else if(show == "room" && floor) {
			res.end(JSON.stringify(getRoomsByFloor(floor)));
		} else if(show == "device" && room) {
			res.end(JSON.stringify(getDevicesByRoom(room)));
		} else if(show == "rs485" && device) {
			res.end(JSON.stringify(getRS485ByDevice(device)));
		} else if(show == "switch") {
			res.json(data.switches);
			// res.end(JSON.stringify(data.switches));
		}
	}
});

app.get('/backup.json', function(req, res) {
	fs.writeFile("backup.json", JSON.stringify(data), function(){console.log("[INFO] Backup file saved")});
	res.sendFile(__dirname + "/backup.json", {}, function(err) {console.log("[INFO] File sent.")})
});

// console.log(getRoomsByFloor(2));
// console.log(getDevicesByRoom(22));
// console.log(getRS485ByDevice(2202));



// Express Server
var server = app.listen(80, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("[INFO] 网页服务器已启动，请访问 http://%s:%s", host, port);
});
