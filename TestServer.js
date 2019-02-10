// Dependencies
var http  = require('http');
var static = require('node-static');
var url = require('url');
var fs = require('fs');
var path = require('path');
var ws = require('nodejs-websocket');
var sqlite3 = require('sqlite3');
var net = require('net');
var cheerio = require("cheerio"); // Web Crawler
var crawler = require("./crawler.js");


// HTTP Server
var statServer = new static.Server('./');
var server = null;

// WebSocket Server
var ws_port = 8889;
var ws_clients = [];

// RS485 Relay Client
var port = 10006;
var host = '192.168.1.7';
var client_conn = false;

// Temperary Varialbles
var weatherInfo = {};

// WebApp Variables
var selected = 1;

// Database (SQLite)
var db;
var btnnames;
var btncode;

// Get local IP
function getIPAdress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}

function webSocketHandler(conn) {
    console.log("[INFO] New client connection.");
    ws_clients.push(conn);
    conn.sendText("hello");
    conn.on("text", function(str) {
        console.log("[INFO] Recv: " + str);
        conn.sendText("Recv: " + str);
        let serialCode = getBtnCode(str);
        console.log("[INFO] RS485 Code="+serialCode);
        if(serialCode != -1)
        	sendSerial(serialCode);
    });
    conn.on('close', function(){
    	console.log('closed');
    	ws_clients.splice(ws_clients.indexOf(conn), 1);
    });
    conn.on('error', function(){
    	console.log('error');
    });
}

function serverHandler (request, response) {
	var URL = request.url;
	var pathname = url.parse(request.url).pathname;

	console.log("[INFO] File " + pathname + " accessed.");

	if(/^\/query/.test(pathname)) {
		if(/^\/query\?var=scene/.test(URL)) {
			response.writeHead(200, {"Content-Type": "text/plain"});
        	response.write(selected.toString());
        	response.end();
		}
		else if(/^\/query\?scene=/.test(URL)) {
			selected = parseInt(URL.split('=')[1]);

			response.writeHead(200, {"Content-Type": "text/plain"});
        	response.write("");
        	response.end();
		}
		else if(/^\/query\?var=btncode/.test(URL)) {
			console.log("[INFO] BTN_CODE requested");
			response.writeHead(200, {"Content-Type": "text/plain"});
        	response.write(JSON.stringify(btnnames));
        	response.end();
		}
		else if(/^\/query\?var=ws/.test(URL)) {
			console.log("[INFO] Local IP requested. (" + getIPAdress() + ")");
			response.writeHead(200, {"Content-Type": "text/plain"});
        	//response.write("ws://127.0.0.1:" + ws_port);
        	response.write("ws://192.168.1.4:" + ws_port);
        	//response.write("ws://" + getIPAdress() + ":" + ws_port);
        	response.end();
		}
		else if(/^\/query\?var=weatherinfo/.test(URL)) {
			console.log("[INFO] Weather information requested");
			response.writeHead(200, {"Content-Type": "text/plain"});
        	response.write(JSON.stringify(weatherInfo));
        	response.end();
		}
	} else {
		try {
			statServer.serve(request, response);
		} catch(e) {
        	response.writeHead(200, {"Content-Type": "text/plain"});
        	response.write("Bad access on " + pathName + "\n");
        	response.end();
		}
	}
}

function parseDeviceCode(str) {

}

function broadcast(sender, sockets, data) {
	sockets.forEach(function(socket){
		if (socket !== sender) {
			socket.sendText(data);
		}
	});
}

function getBtnCode(str) {
	let ID = parseInt(str.split('=')[1]);

	for(let i=0; i<btncode.length; i++) {
		if(btncode[i].ID == ID)
			return(btncode[i].CODE);
	}

	return -1;
}

function sendSerial(str) {
	if(client_conn) {
		//client.write(str.toString('hex'));
		
		buff = new Buffer.from(str, 'hex');
		client.write(buff);
		console.log('[INFO] Serial code sent. RS485已发送。');
	} else {
		console.log('[INFO] Server not connected. RS485发送失败，请检查连接。');
	}
}

function loadDB() {
	db = new sqlite3.Database("./btncode.db", function(err){
		if (err)
			throw err;
	});
	
	db.all("SELECT * FROM BTN_TABLE", function(err, data) {
		btncode = data;
		console.log('[INFO] Data loaded. 数据载入完成。')
		//console.log(btncode);
	});

	db.all("SELECT ID, NAME FROM BTN_TABLE", function(err, data) {
		btnnames = data;
		//console.log(btncode);
	});
}

function InitRS485Client() {
	client.setEncoding('UTF-8');
	client.connect(port,host,function() {
		console.log('[INFO] (RS485) TCP Server Connected. RS485转发模块已连接。');
		client_conn = true;
		//client.write('hello server');
	});

	client.on('data',function(data) {
		str = new Buffer.from(data, 'UTF-8').toString('hex');
		console.log('from server: '+ str);
	});

	client.on('error',function(error) {
		console.log(error);
	});

	client.on('close',function() {
		console.log('[ERROR] (RS485) Connection closed. 检查转发模块网络配置是否正确。');
		client.connect(port,host,function() {
			console.log('[INFO] (RS485) TCP Server Connected. RS485转发模块已连接。');
			client_conn = true;
			//client.write('hello server');
		});
	});
}

// Initialize database
loadDB();

// Initialize network services
var server = http.createServer(serverHandler);
var ws_server = ws.createServer(webSocketHandler);
var client = new net.Socket();

server.listen(80);
ws_server.listen(ws_port);
console.log('[INFO] Server initialized. 服务器已启用。');
InitRS485Client();

// 天气
var UpdateWeather = function (data) {
	weatherInfo = data;
	console.log(weatherInfo);
};

crawler.getWeatherInfo(UpdateWeather);

