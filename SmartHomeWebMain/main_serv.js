// "Hello world" server

// like include
var http  = require('http');
var static = require('node-static');
var url = require('url');
var fs = require('fs');
var path = require('path');
var ws = require('nodejs-websocket');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var sshClient = require('ssh2').Client;

var statServer = new static.Server('./');
var server = null;
var no = 0;
var imgList = [];
var ws_port = 12345;

var reminderJSON = JSON.parse(fs.readFileSync('./reminder/reminders.json'));

// like a callback
function handler (request, response) {
    var URL = request.url;
    var rawURL = request.url;
    var pathname = url.parse(request.url).pathname;

    console.log("New request " + URL + " from " + request.connection.remoteAddress);

    if(request.method == "POST") {
        request.on("data", function(data){
            var recvStr = decodeURIComponent(data).split('=')[1];
            console.log(recvStr);
            reminderJSON.reminders.push(recvStr.replace(/\+/g, ' '));
            reminderJSON.count = reminderJSON.reminders.length;
            fs.writeFileSync('./reminder/reminders.json', JSON.stringify(reminderJSON));
            
            response.writeHead(302, {"Location": "./"});
            response.end();
        });
        return;
    }

    // request query
    if(/^\/query/.test(pathname)) {
    	var URL = URL.replace("/","");
    	//console.log(URL.split('?')[1].split('=')[0]);
    	
    	var imgNum = Number(URL.split('?')[1].split('=')[1]);
    	if(imgNum < 0 || imgNum > 989) {
    		console.log("Error: image " + imgNum + " out of bound.");
    		response.writeHead(400, {"Content-Type": "text/plain"});
    		response.write("Bad Request\n");
    		response.end();
    	} else {
    		console.log("Client requests image num: " + imgNum);
    		response.writeHead(200, {"Content-Type": "text/plain"});
    		response.write("http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/" + imgList[imgNum]);
    		response.end();
    		console.log("ImageURL=http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/" + imgList[imgNum] +" sent" );
    	}
    } else if(/^\/fs/.test(pathname)) {
        var dirPath = URL.split('?')[1].split('=')[1];
        console.log("Retrieving dir: " + dirPath);
        response.writeHead(200, {"Content-Type": "text/plain"});

        response.end();
        console.log("Dir " + dirPath + " listing successful.");
    } else if(/^\/files/.test(pathname)) {
        pathname = "." + pathname;
        var file = fs.lstatSync(pathname);
        console.log(pathname);
        if(file)
            console.log(file.isDirectory());
    } else if(/^\/reminder\/reminder\?req=get$/.test(URL)) {
        var data = JSON.stringify(reminderJSON);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(data);
        response.end();
    } else if(/^\/reminder\/reminder\?del=/.test(URL)) {
        var index = Number(URL.split('=')[1]);
        reminderJSON.reminders.splice(index, 1);
        fs.writeFileSync('./reminder/reminders.json', JSON.stringify(reminderJSON));
        var data = JSON.stringify(reminderJSON);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(data);
        response.end();
    }
    // show files in ./
    else {
        var file;
        pathName = "." + pathname;
        console.log(pathName);
        try {
            file = fs.lstatSync(pathName);
            if(file.isDirectory()) {
                var dirList = fs.readdirSync(pathName);
                if(dirList.indexOf("index.html") != -1) {
                    console.log("index.html found.");
                    statServer.serve(request, response);
                } else {
                    console.log("Retrieving dir: " + pathname);
                    var URL = URL;
                    if(URL[URL.length - 1] != '/')
                        URL = URL + "/";
                    var pdirURL = path.resolve(pathName, '..').replace("/var/www/html", "");
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write("<div><h2>File List</h2></div>");
                    if(pdirURL != "") {
                        response.write("<div><a href=\"" + pdirURL + "\">..</a></div>");
                    }
                    else {
                        response.write("<div><a href=\"..\">..</a></div>");
                    }
                    console.log("URL: " + path.resolve(pathName, '..') + " After: " + path.resolve(pathName, '..').replace("/var/www/html", ""));
                    for(var i=0; i<dirList.length; i++)
                        if(fs.lstatSync(pathName + "/" + dirList[i]).isDirectory())
                            response.write("<div><a href=\"" + URL + dirList[i] + "\"><b>" + dirList[i] + "</b></a></div>");
                    for(var i=0; i<dirList.length; i++)
                        if(!fs.lstatSync(pathName + "/" + dirList[i]).isDirectory())
                            response.write("<div><a href=\"" + URL + dirList[i] + "\">" + dirList[i] + "</a></div>");
                    response.end();
                    console.log("Dir " + pathName + " listing successful.");
                    console.log(dirList);
                }
            } else {
                statServer.serve(request, response);
            }
        } catch(e) {
            pathName = pathName.replace(/%20/g, ' ');
            fs.exists(pathName, function (exist) {
                if(exist){
                    statServer.serve(request, response);
                } else {
                    console.log("");
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    response.write("Bad access on " + pathName + "\n");
                    response.end();
                }
            });
        }
    }
}

function webSocketHandler(conn) {
    console.log("New conn");
    conn.sendText("hello");
    conn.on("text", function(str) {
        console.log("Recv: " + str);
        str = str.split(/^tty_sim:\s\$\s/)[1];
        
        

        //cmd = str.split(" ")[0];
        //par = str.split(" ")[1];
        
        console.log(str);
        try {
            var free = exec(str);
            free.stdout.on('data', function(data){
                conn.sendText(data);
            });

            free.stderr.on('data', function(data){
                conn.sendText(data);
            });

            free.on('exit', function (code, signal) {
                console.log('child process eixt ,exit:' + code);
            });

            free.on('error', function (code, signal) {
                conn.sendText("Command not found.");
            });

        } catch (e) {
            console.log("fail");
        }
        
    });
}

function sshHandler() {
    var sshConn = new sshClient();
        sshConn.on('ready', function(){
            sshConn.exec(str, function(error, stream){
                if(error)
                    console.log("SSH ERROR");
                stream.on('close', function(code, signal) {
                    sshConn.end();
                }).on('data', function(data) {
                    conn.sendText(data);
                });
            });
        }).connect({
            host: "pc34.cs.ucdavis.edu",
            port: "22",
            username: "",
            password: ""
        });
}

function loadImageList() {
	var data = fs.readFileSync('photoList.json');
	if(!data) {
		console.log("cannot read photoList.json");
	} else {
		listObj = JSON.parse(data);
		imgList = listObj.photoURLs;
		console.log("photoList.json loaded");
	}
}

function readDir(dirPath) {

}

var server = http.createServer(handler);
var ws_server = ws.createServer(webSocketHandler);
//loadImageList();


// fill in YOUR port number!
server.listen(80);
console.log("HTTP Server listening port: 80");
ws_server.listen(ws_port);
console.log("WebSocket Server listening port: " + ws_port);


// <input type="text" onkeydown="if(event.keyCode==13) myFunction();"> // enter down...