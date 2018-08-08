var wrapper_width = 200;
var slider_width = 20;
var drag = false;
var wrappers = [];

var ws;

function sel_floor(index) {
	var left = document.getElementById("left");
	var floor = document.getElementById("first-floor");

	left.style.display = "none";
	floor.style.display = "flex";
}

function show_floor() {
	var left = document.getElementById("left");
	var floor = document.getElementById("first-floor");

	left.style.display = "flex";
	floor.style.display = "none";	
}

function sel_room(index) {
	
}

function wrapper_init(index) {
	var wrapper = document.getElementById('wrapper-' + index);
	var slider = document.getElementById('slider-' + index);
	var fill = document.getElementById('fill-' + index);
	var fillBlank = document.getElementById('fill-blank-' + index);

	slider.style.left = 0 +'px';
	fill.style.width = 10 + 'px';
	fillBlank.style.width = 190  + 'px';
	//fillBlank.style.left = fill.style.width;
}


// Move slider
function wrapper_click(index, event) {
	var wrapper = document.getElementById('wrapper-' + index);
	var slider = document.getElementById('slider-' + index);
	var fill = document.getElementById('fill-' + index);
	var fillBlank = document.getElementById('fill-blank-' + index);
	
	var target = event.target;

	var sliderLeft = parseFloat(slider.style.left);
	var fillWidth = parseFloat(fill.style.width);
	var fillBlankWidth = parseFloat(fillBlank.style.width);
	var fillBlankLeft = parseFloat(fillBlank.style.left);

	var x = event.offsetX;

	var slider_mid = slider_width / 2;

	if(target == wrapper || target == fill) {
		sliderLeft = x - slider_mid;
		fillWidth = x;
		fillBlankWidth = wrapper_width - fillWidth;
	} else if(event.target == fillBlank) {
		sliderLeft = sliderLeft + x;
		fillWidth = fillWidth + x;
		fillBlankWidth = wrapper_width - fillWidth;
	} else if(event.target == slider) {
		// range [-5, 5]
		var diff = x - slider_mid;
		sliderLeft = sliderLeft + diff;
		fillWidth = fillWidth + diff;
		fillBlankWidth = wrapper_width - fillWidth;
	}

	// Keep the slider within the wrapper
	if(sliderLeft < slider_mid) {
		sliderLeft = 0;
		fillWidth = slider_mid;
		fillBlankWidth = wrapper_width - fillWidth;
	} else if(sliderLeft > wrapper_width - slider_width) {
		sliderLeft = wrapper_width - slider_width;
		fillWidth = wrapper_width - slider_mid;
		fillBlankWidth = slider_mid;
	}

	slider.style.left = sliderLeft +'px';
	fill.style.width = fillWidth + 'px';
	fillBlank.style.width = fillBlankWidth + 'px';
	fillBlank.style.left = fillBlankLeft + 'px';

	var reqJSON = [];
	var item = {};
	item.type = "dev";
	item.id = "1";
	item.method = "post";
	item.valtype = "brightness";
	item.value = sliderLeft / wrapper_width;
	reqJSON.push(item);
	ws.send(JSON.stringify(reqJSON));
	console.log(reqJSON);
	//console.log(event.offsetX);
	//console.log(event.target);
}

function move_slider_animation() {

}

function move_slider(index, ratio) {
	var wrapper = document.getElementById('wrapper-' + index);
	var slider = document.getElementById('slider-' + index);
	var fill = document.getElementById('fill-' + index);
	var fillBlank = document.getElementById('fill-blank-' + index);

	var sliderLeft = parseFloat(slider.style.left);
	var fillWidth = parseFloat(fill.style.width);
	var fillBlankWidth = parseFloat(fillBlank.style.width);
	var fillBlankLeft = parseFloat(fillBlank.style.left);

	sliderLeft = wrapper_width * ratio;
	fillWidth = sliderLeft + 5;
	fillBlankWidth = wrapper_width - fillWidth;

	slider.style.left = sliderLeft +'px';
	fill.style.width = fillWidth + 'px';
	fillBlank.style.width = fillBlankWidth + 'px';
}

document.getElementById('wrapper-1').addEventListener('click', function(e){
	wrapper_click(1, e);
});

document.getElementById('wrapper-1').addEventListener('mousedown', function(e){
	drag = true;
	wrapper_click(1, e);
});

document.getElementById('wrapper-1').addEventListener('mouseup', function(e){
	drag = false;
});

document.getElementById('wrapper-1').addEventListener('mousemove', function(e){
	if(drag)
		wrapper_click(1, e);
});

document.getElementById('wrapper-1').addEventListener('touchmove', function(e){
	wrapper_click(1, e);
});

wrapper_init(1);

function startWebSocket() {
	ws = new WebSocket("ws://192.168.1.117:12345");
	ws.onopen = function(evt) {
		console.log("OPEN");
	};

	ws.onmessage = function(evt) {
		console.log("Recv: " + evt.data);
		//move_slider(1, parseFloat(evt.data));
		respondDevInfo(evt.data);
	};

	ws.onclose = function(evt) {
		console.log("Offline");
	};
}

function requestDevInfo() {
	var reqJSON = [];
	var item = {};
	item.type = "dev";
	item.id = "1";
	item.method = "get";
	item.valtype = "brightness";
	reqJSON.push(item);
	ws.send(JSON.stringify(reqJSON));
	console.log(reqJSON);
}

function respondDevInfo(data) {
	var res = JSON.parse(data);
	console.log(res.value);
	move_slider(1, parseFloat(res.value));
}

startWebSocket();

setInterval("requestDevInfo()", 1000);