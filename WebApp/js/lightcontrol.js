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
	var slider = document.createElement('div');
	var slider_bar = document.createElement('div');

	// Brightness Percentage
	var brtperc = document.createElement('div');
	brtperc.id = "brt-perc"
	brtperc.textContent = Math.round(50 / 3) + "%";
	/*
	var loc_part = document.createElement('div');
	var loc_text = document.createElement('a');
	var navi_img = document.createElement('img');
	var cond_img = document.createElement('img');
	*/

	//<input type="range" min="1" max="100" value="50" class="slider" id="myRange">
	slider.className = "light-slider";
	slider.id = blk_id + "-slider";
	slider_bar.className = "light-slider-bar";
	slider_bar.id = blk_id + "-slider-bar";
	slider_bar.style.width = "50px";
	slider.appendChild(slider_bar);

	//var info = document.createElement('p');
	//info.id = "info";

	//info.textContent = "0";
	/*
	temp_text.textContent = data.query.results.channel.item.condition.temp + "°";
	cond_text.textContent = data.query.results.channel.item.condition.text;
	navi_img.src = "./img/navigation.svg";
	cond_img.src = "./img/sun.svg";
	*/
	slider.addEventListener('mousedown', function(e){
		sliderOnTouch = 0;
		//info.textContent = sliderOnTouch;
		startWidth = parseInt(slider_bar.style.width);
		startX = e.pageX;
	});

	slider.addEventListener('touchstart', function(e){
		sliderOnTouch = 0;
		//info.textContent = sliderOnTouch;
		startWidth = parseInt(document.getElementById("light-blk-1-slider-bar").style.width);
		startX = e.touches[0].pageX;
	});

	slider_bar.addEventListener('touchstart', function(e){
		sliderOnTouch = 0;
		//info.textContent = sliderOnTouch;
		startWidth = parseInt(document.getElementById("light-blk-1-slider-bar").style.width);
		startX = e.touches[0].pageX;
	});

	slider.appendChild(brtperc)

	addBlockTitle(light_block, "Light");
	light_block.appendChild(slider);
	
	//light_block.appendChild(info);
}

var mouseX, mouseY, startX, startWidth;

var sliderOnTouch = -1;

document.addEventListener('touchmove', function(e){
	mouseX = e.touches[0].pageX;
	mouseY = e.touches[0].pageY;
	//info.textContent = e.touches[0].pageX + ", " + e.touches[0].pageY;
	if(sliderOnTouch == 0) {
		var slider_bar = document.getElementById("light-blk-1-slider-bar");
		var slider_bar_width = startWidth + mouseX - startX;
		var brtperc = document.getElementById("brt-perc");
		if(slider_bar_width > 300)
			slider_bar_width = 300;
		if(slider_bar_width < 0)
			slider_bar_width = 0;
		slider_bar.style.width = slider_bar_width + 'px';
		brtperc.textContent = Math.round(slider_bar_width / 3) + "%";

	}
});

document.addEventListener('mousemove', function(e){
	mouseX = e.pageX;
	mouseY = e.pageY;
	//info.textContent = e.pageX + ", " + e.pageY;
	if(sliderOnTouch == 0) {
		var slider_bar = document.getElementById("light-blk-1-slider-bar");
		var slider_bar_width = startWidth + mouseX - startX;
		var brtperc = document.getElementById("brt-perc");
		if(slider_bar_width > 300)
			slider_bar_width = 300;
		if(slider_bar_width < 0)
			slider_bar_width = 0;
		slider_bar.style.width = slider_bar_width + 'px';
		brtperc.textContent = Math.round(slider_bar_width / 3) + "%";
	}
});

document.addEventListener('touchend', function(e){
	sliderOnTouch = -1;
	//info.textContent = sliderOnTouch;
});

document.addEventListener('mouseup', function(e){
	sliderOnTouch = -1;
	//info.textContent = sliderOnTouch;
});