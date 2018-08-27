function showLightControlBlock(dev_id, blk_index) {
	var display = document.getElementById('display');
	var light_block = document.createElement('div');
	light_block.className = "light-blk";
	light_block.id = "light-blk-" + blk_index;
	display.appendChild(light_block);

	// for test use
	updateLightBlock(dev_id, light_block.id);
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

function updateLightBlock(dev_id, blk_id) {
	var light_block = document.getElementById(blk_id);
	var slider = document.createElement('input');
	/*
	var loc_part = document.createElement('div');
	var loc_text = document.createElement('a');
	var navi_img = document.createElement('img');
	var cond_img = document.createElement('img');
	*/

	//<input type="range" min="1" max="100" value="50" class="slider" id="myRange">
	slider.className = "light-slider";
	slider.id = blk_id + "-slider"
	slider.type = "range";
	slider.min = "0";
	slider.max = "100";
	slider.value = 10;
	slider.style.background = "linear-gradient(to right,white " + slider.value + "%, #555555 1%, #555555)";
	slider.oninput = function() {
		this.style.background = "linear-gradient(to right,white " + this.value + "%, #555555 1%, #555555)";
	};
	slider.onchange = function() {
		this.style.background = "linear-gradient(to right,white " + this.value + "%, #555555 1%, #555555)";
	};


	/*
	temp_text.textContent = data.query.results.channel.item.condition.temp + "°";
	cond_text.textContent = data.query.results.channel.item.condition.text;
	navi_img.src = "./img/navigation.svg";
	cond_img.src = "./img/sun.svg";
	*/
	addBlockTitle(light_block, "Light");
	light_block.appendChild(slider);
}