function showACBlock(dev_id) {
	var display = document.getElementById('display');
	var ac_block = document.createElement('div');
	ac_block.id = "ac-blk-1";
	ac_block.className = "ac-blk";
	display.appendChild(ac_block);

	// for test use
	updateAC(0);

	// TODO:
	// req from server, stat for now
	//ReqWeatherFromYahoo("davis", "ca");
}

function ReqConsumption(city, state) {
	var oReq = new XMLHttpRequest();
	var reqURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22davis%2C%20ca%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	oReq.open("GET", reqURL);
	oReq.addEventListener("load", function() {
		updateWeather(JSON.parse(this.responseText));
	});
	oReq.send();
}

function updateAC(data) {
	var ac_block = document.getElementById('ac-blk-1');

	// Switch
	var switch_part = document.createElement('div');
	var switch_text = document.createElement('a');
	var switch_checkbox = document.createElement('input');
	var switch_slider = document.createElement('span');

	// Mode
	var mode_cool_part = document.createElement('div');
	var mode_warm_part = document.createElement('div');
	var mode_auto_part = document.createElement('div');

	var mode_cool_img = document.createElement('img');
	var mode_warm_img = document.createElement('img');
	var mode_auto_img = document.createElement('img');
	
	mode_cool_img.className = "ac-mode-img";
	mode_warm_img.className = "ac-mode-img";
	mode_auto_img.className = "ac-mode-img";

	mode_cool_part.className = "mode-switch";
	mode_warm_part.className = "mode-switch";
	mode_auto_part.className = "mode-switch";

	mode_cool_part.id = "mode-cool";
	mode_warm_part.id = "mode-warm";
	mode_auto_part.id = "mode-auto";

	mode_cool_img.src = "./img/cool.svg";
	mode_warm_img.src = "./img/warm.svg";
	mode_auto_img.src = "./img/auto.svg";

	mode_cool_part.appendChild(mode_cool_img);
	mode_warm_part.appendChild(mode_warm_img);
	mode_auto_part.appendChild(mode_auto_img);

	// Temp
	var temp_up = document.createElement('div');
	var temp_down = document.createElement('div');
	var temp_value = document.createElement('a');

	temp_up.id = "temp-up-btn";
	temp_up.className = "fa fa-angle-up";
	temp_up.onclick = function() {
		temp_value.textContent =  parseInt(temp_value.textContent) + 1;
	};
	temp_down.id = "temp-down-btn";
	temp_down.className = "fa fa-angle-down";
	temp_down.onclick = function() {
		temp_value.textContent =  parseInt(temp_value.textContent) - 1;
	};
	temp_value.id = "temp-value";

	temp_value.textContent = 75;

	// Fan
	var fan_icon = document.createElement('img');
	var fan_up = document.createElement('div');
	var fan_down = document.createElement('div');
	var fan_value = document.createElement('a');

	fan_icon.id = "fan_icon";
	fan_icon.src = "./img/fan.svg";

	fan_up.id = "fan-up-btn";
	fan_up.textContent = "+";
	fan_up.onclick = function() {
		fan_value.textContent =  parseInt(fan_value.textContent) + 1;
	};
	fan_down.id = "fan-down-btn";
	fan_down.textContent = "-";
	fan_down.onclick = function() {
		fan_value.textContent =  parseInt(fan_value.textContent) - 1;
	};
	fan_value.id = "fan-value";

	fan_value.textContent = 5;

	/*
	var loc_part = document.createElement('div');
	var loc_text = document.createElement('a');
	var navi_img = document.createElement('img');
	var cond_img = document.createElement('img');
	*/
	/*
	engy_part.id = "engy-part";
	engy_text.id = "engy-text";
	engy_unit.id = "engy-unit";
	engy_accu_part.id = "engy-accu-part";
	engy_accu_text.id = "engy-accu-text";
	engy_accu_unit.id = "engy-accu-unit";

	engy_text.textContent = 256;
	engy_unit.textContent = "W";
	engy_accu_text.textContent = 128;
	engy_accu_unit.textContent = "kWh";
	*/
	/*
	temp_text.textContent = data.query.results.channel.item.condition.temp + "°";
	cond_text.textContent = data.query.results.channel.item.condition.text;
	navi_img.src = "./img/navigation.svg";
	cond_img.src = "./img/sun.svg";
	*/
	/*
	engy_part.appendChild(engy_text);
	engy_part.appendChild(engy_unit);

	engy_accu_part.appendChild(engy_accu_text);
	engy_accu_part.appendChild(engy_accu_unit);
	*/

	addBlockTitle(ac_block, "AC");

	ac_block.appendChild(mode_warm_part);
	ac_block.appendChild(mode_cool_part);
	ac_block.appendChild(mode_auto_part);

	ac_block.appendChild(temp_up);
	ac_block.appendChild(temp_down);
	ac_block.appendChild(temp_value);

	ac_block.appendChild(fan_icon);
	ac_block.appendChild(fan_up);
	ac_block.appendChild(fan_down);
	ac_block.appendChild(fan_value);


}
