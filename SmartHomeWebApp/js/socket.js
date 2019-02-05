var ws;
var ws_connected = false;

function ws_send(str) {
	if(ws_connected)
		ws.send(str);
}

function reqSocket() {
	var request = new XMLHttpRequest();
	request.open("GET", "query?var=ws");
	request.onreadystatechange = function() {

		if (request.readyState !== 4) {
			return;
		}

		if (request.status === 200) {
			socket_callback(request.responseText);
		}
	
	};
	
	request.send(null);
}

function socket_callback(url) {
	ws = new WebSocket(url);
	ws.onopen = function(evt) {
		console.log("Websocket server connected. WebSocket 已连接。");
		ws_connected = true;
	};
	 
	ws.onmessage = function(evt) {
		console.log("Received Message: " + evt.data);
	};
	 
	ws.onclose = function(evt) {
		console.log("Connection closed, reconnecting... 连接已断开， 尝试重连...");
		reqSocket();
	};
}

reqSocket();