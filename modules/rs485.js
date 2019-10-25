// This module is written for rs485 communication support.
var net = require('net');
const host = '192.168.1.7';
const port = 10006;
var conn;
var connected = false;


function Send(str) {
	if(connected) {
		//client.write(str.toString('hex'));
		console.log(str);
		var buff = new Buffer.from(str.replace(/\s*/g,""), 'hex');
		conn.write(buff);
		console.log('[INFO] RS485已发送. Serial code sent. ');
	} else {
		console.log('[INFO] RS485发送失败，请检查连接. Server not connected. ');
	}
}



function Start(OnData) {
    conn = new net.Socket();
    conn.setEncoding('hex');
	conn.connect(port, host, function() {
		console.log('[INFO] RS485转发模块已连接. RS485 module connected.');
		connected = true;
		//client.write('hello server');
	});

	conn.on('data', OnData);

	conn.on('error',function(error) {
		console.log(error);
	});

	conn.on('close',function() {
        console.log('[ERROR] (RS485) Connection closed. 检查转发模块网络配置是否正确。');
        console.log("[INFO] 尝试重新连接RS485转发模块.")
        Start();
	});
}

exports.Start = Start;
exports.Send = Send;