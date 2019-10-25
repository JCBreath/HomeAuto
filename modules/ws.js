// This module is written for websocket support.
var ws = require("nodejs-websocket");

const ws_port = "8889";
const ws_host = "192.168.2.106";

var ws_server;
var ws_clients = [];

function getBtnCode(str) {
	let ID = parseInt(str.split('=')[1]);

	for(let i=0; i<data.rs485.length; i++) {
		if(data.rs485[i].ID == ID)
			return(data.rs485[i].OUT_SIG);
	}

	return -1;
}

function Handler(conn) {
    console.log("[INFO] WS新连接. New client connection.");
    // console.log(conn);
    ws_clients.push(conn);
    conn.sendText("hello");
    conn.on("text", function(str) {
        console.log("[INFO] WS收到信息 " + str);
        conn.sendText("Recv: " + str);
        let serialCode = getBtnCode(str);
        console.log("[INFO] 准备发送 RS485代码 "+serialCode);
        if(serialCode != -1)
            SendSerial(serialCode);
    });
    conn.on('close', function(){
        console.log("[INFO] WS连接已断开.");
        ws_clients.splice(ws_clients.indexOf(conn), 1);
    });
    conn.on('error', function(){
        console.log('error');
    });
}

function Start() {
    ws_server = ws.createServer(Handler);
    ws_server.listen(ws_port);
    console.log("[INFO] WS服务器已启动 Websocket server started (" + ws_host + ":" + ws_port + ")");
}

exports.Start = Start;
exports.ws_port = ws_port;