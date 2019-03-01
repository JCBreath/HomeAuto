var http  = require('http');
var static = require('node-static');
var url = require('url');
var fs = require('fs');
var path = require('path');
var ws = require('nodejs-websocket');
var sqlite3 = require('sqlite3');
var net = require('net');

var statServer = new static.Server('./');
var server = null;
var ws_port = 8889; // websocket port

var port = 10006;
var host = '127.0.0.1';
var client_conn = false;

var selected = 1;

var ws_clients = [];
var db;

var btnnames;
var btncode;

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
    console.log("New connection.");
    ws_clients.push(conn);
    conn.sendText("hello");
    conn.on("text", function(str) {
        console.log("Recv: " + str);
        conn.sendText("Recv: " + str);
        let serialCode = getBtnCode(str);
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

	console.log(pathname);

	if(/^\/query/.test(pathname)) {
		if(/^\/query\?var=scene/.test(URL)) {
			response.writeHead(200, {"Content-Type": "text/plain"});
        	response.write(selected.toString());
        	response.end();
		}
		if(/^\/query\?scene=/.test(URL)) {
			selected = parseInt(URL.split('=')[1]);

			response.writeHead(200, {"Content-Type": "text/plain"});
        	response.write("");
        	response.end();
		}
		if(/^\/query\?var=btncode/.test(URL)) {
			console.log("BTN_CODE requested");
			response.writeHead(200, {"Content-Type": "text/plain"});
        	response.write(JSON.stringify(btnnames));
        	response.end();
		}
		if(/^\/query\?var=ws/.test(URL)) {
			console.log("WS requested");
			response.writeHead(200, {"Content-Type": "text/plain"});
        	//response.write("ws://127.0.0.1:" + ws_port);
        	response.write("ws://" + getIPAdress() + ":" + ws_port);
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
		client.write(str);
		console.log('Send serial code: ' + str);
	} else {
		console.log('Server not connected.');
	}
}

const Hexstring2btye = (str)=> { let pos = 0; let len = str.length; if (len % 2 != 0) { return null; } len /= 2; let hexA = new Array(); for (let i = 0; i < len; i++) { let s = str.substr(pos, 2); let v = parseInt(s, 16); hexA.push(v); pos += 2; } return hexA; }

const Bytes2HexString = (b)=> { let hexs = ""; for (let i = 0; i < b.length; i++) { let hex = (b[i]).toString(16); if (hex.length === 1) { hexs = '0' + hex; } hexs += hex.toUpperCase(); } return hexs; }

function loadDB() {
	db = new sqlite3.Database("./btncode.db", function(err){
		if (err)
			throw err;
	});
	
	db.all("SELECT * FROM BTN_TABLE", function(err, data) {
		btncode = data;
		//console.log(btncode);
	});

	db.all("SELECT ID, NAME FROM BTN_TABLE", function(err, data) {
		btnnames = data;
		//console.log(btncode);
	});
}

loadDB();

var server = http.createServer(serverHandler);
var ws_server = ws.createServer(webSocketHandler);

server.listen(8888);
ws_server.listen(ws_port);

var client = new net.Socket();
client.setEncoding('binary');
client.connect(port,host,function() {
	console.log('TCP Server Connected.');
	client_conn = true;
	//client.write('hello server');
});

client.on('data',function(data) {
	console.log('from server:'+ data);
});

client.on('error',function(error) {
	console.log(error);
});

client.on('close',function() {
	console.log('Connection closed. 检查模块网络配置是否正确。');
});