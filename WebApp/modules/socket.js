var net = require('net');
var client;
var interval = 60000;

function Connect(ip, port, ondata) {
    try{
        client = new net.Socket();
        client.connect(port, ip);
        client.setEncoding('utf8');
        console.log("[INFO] IP updated.");
        client.on('data', ondata);
        client.on('error', function() {
            
        });
        setTimeout(Close, interval);
    } catch {
        setTimeout(Reconnect, interval);
    }
}

function Close() {
    try {
        client.destroy();
        setTimeout(Reconnect, interval);
    } catch {
        setTimeout(Reconnect, interval);
    }
}

function Reconnect() {
    try{
        Connect("132.232.3.155", 18867, function(){});
    } catch {
        setTimeout(Reconnect, interval);
    }
}

exports.Connect = Connect;
exports.Close = Close;

var time = {
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds()
};

// console.log(time);

// Connect("132.232.3.155", 18867, function(){});