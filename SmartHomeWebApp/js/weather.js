function showWeatherBlock() {
	var display = document.getElementById('display');
	var weather_block = document.createElement('div');
	weather_block.className = "home-blk";
	weather_block.id = "weather-blk";
	display.appendChild(weather_block);
	ReqWeatherFromYahoo("davis", "ca");
}

function ReqWeatherFromYahoo(city, state) {
	var oReq = new XMLHttpRequest();
	var reqURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22davis%2C%20ca%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	oReq.open("GET", reqURL);
	oReq.addEventListener("load", function() {
		updateWeather(JSON.parse(this.responseText));
	});
	oReq.send();
}

function updateWeather(data) {
	var weather_block = document.getElementById('weather-blk');
	var temp_text = document.createElement('a');
	var cond_text = document.createElement('a');
	var loc_part = document.createElement('div');
	var loc_text = document.createElement('a');
	var navi_img = document.createElement('img');
	var cond_img = document.createElement('img');



	temp_text.id = "temp-text";
	cond_text.id = "cond-text";
	loc_part.id = "loc-part";
	loc_text.id = "loc-text";
	navi_img.id = "navi-img";
	cond_img.id = "cond-img";

	loc_text.textContent = data.query.results.channel.location.city;
	temp_text.textContent = data.query.results.channel.item.condition.temp + "°";
	cond_text.textContent = data.query.results.channel.item.condition.text;
	navi_img.src = "./img/navigation.svg";
	cond_img.src = "./img/sun.svg";

	loc_part.appendChild(navi_img);
	loc_part.appendChild(loc_text);

	
	addBlockTitle(weather_block, "Weather");
	weather_block.appendChild(temp_text);
	weather_block.appendChild(cond_img);
	weather_block.appendChild(cond_text);
	weather_block.appendChild(loc_part);
}

/*
var display = document.getElementById('display');
var display_fill = document.createElement('div');
	
display_fill.id = "display-fill";
display.appendChild(display_fill);
*/