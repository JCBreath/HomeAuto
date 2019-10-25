function showConsumptionBlock() {
	var display = document.getElementById('display');
	var consumption_block = document.createElement('div');
	consumption_block.id = "consumption-blk";
	consumption_block.className = "home-blk";
	display.appendChild(consumption_block);

	// for test use
	updateConsumption(0);

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

function updateConsumption(data) {
	var consumption_block = document.getElementById('consumption-blk');
	var engy_part = document.createElement('div');
	var engy_accu_part = document.createElement('div');
	var engy_text = document.createElement('a');
	var engy_unit = document.createElement('a');
	var engy_accu_text = document.createElement('a');
	var engy_accu_unit = document.createElement('a');
	/*
	var loc_part = document.createElement('div');
	var loc_text = document.createElement('a');
	var navi_img = document.createElement('img');
	var cond_img = document.createElement('img');
	*/

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
	/*
	temp_text.textContent = data.query.results.channel.item.condition.temp + "°";
	cond_text.textContent = data.query.results.channel.item.condition.text;
	navi_img.src = "./img/navigation.svg";
	cond_img.src = "./img/sun.svg";
	*/

	engy_part.appendChild(engy_text);
	engy_part.appendChild(engy_unit);

	engy_accu_part.appendChild(engy_accu_text);
	engy_accu_part.appendChild(engy_accu_unit);

	consumption_block.appendChild(engy_part);
	consumption_block.appendChild(engy_accu_part);
	addBlockTitle(consumption_block, "能耗");
}
