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
	var mode_heat_part = document.createElement('div');
	var mode_auto_part = document.createElement('div');

	//var mode_cool_img = document.createElement('img');
	var mode_heat_img = document.createElement('div');
	var container = document.createElementNS('http://www.w3.org/2000/svg','svg');
	var svgContent = "<g><g><path d='M204.8,97.6C191.2,84,172,75.2,151.2,75.2s-40,8.4-53.6,22.4c-13.6,13.6-22.4,32.8-22.4,53.6s8.8,40,22.4,53.6    c13.6,13.6,32.8,22.4,53.6,22.4s40-8.4,53.6-22.4c13.6-13.6,22.4-32.8,22.4-53.6S218.8,111.2,204.8,97.6z M190.4,190.4    c-10,10-24,16-39.2,16s-29.2-6-39.2-16s-16-24-16-39.2s6-29.2,16-39.2s24-16,39.2-16s29.2,6,39.2,16s16,24,16,39.2    S200.4,180.4,190.4,190.4z'/></g></g><g><g><path d='M292,140.8h-30.8c-5.6,0-10.4,4.8-10.4,10.4c0,5.6,4.8,10.4,10.4,10.4H292c5.6,0,10.4-4.8,10.4-10.4    C302.4,145.6,297.6,140.8,292,140.8z'/></g></g><g><g><path d='M151.2,250.8c-5.6,0-10.4,4.8-10.4,10.4V292c0,5.6,4.8,10.4,10.4,10.4c5.6,0,10.4-4.8,10.4-10.4v-30.8    C161.6,255.6,156.8,250.8,151.2,250.8z'/></g></g><g><g><path d='M258,243.6l-22-22c-3.6-4-10.4-4-14.4,0s-4,10.4,0,14.4l22,22c4,4,10.4,4,14.4,0S262,247.6,258,243.6z'/></g></g><g><g><path d='M151.2,0c-5.6,0-10.4,4.8-10.4,10.4v30.8c0,5.6,4.8,10.4,10.4,10.4c5.6,0,10.4-4.8,10.4-10.4V10.4    C161.6,4.8,156.8,0,151.2,0z'/></g></g><g><g>	<path d='M258.4,44.4c-4-4-10.4-4-14.4,0l-22,22c-4,4-4,10.4,0,14.4c3.6,4,10.4,4,14.4,0l22-22C262.4,54.8,262.4,48.4,258.4,44.4z'/></g></g><g><g><path d='M41.2,140.8H10.4c-5.6,0-10.4,4.8-10.4,10.4s4.4,10.4,10.4,10.4h30.8c5.6,0,10.4-4.8,10.4-10.4    C51.6,145.6,46.8,140.8,41.2,140.8z'/></g></g><g><g><path d='M80.4,221.6c-3.6-4-10.4-4-14.4,0l-22,22c-4,4-4,10.4,0,14.4s10.4,4,14.4,0l22-22C84.4,232,84.4,225.6,80.4,221.6z'/></g></g><g><path d='M80.4,66.4l-22-22c-4-4-10.4-4-14.4,0s-4,10.4,0,14.4l22,22c4,4,10.4,4,14.4,0S84.4,70.4,80.4,66.4z'/></g></g>";
	mode_heat_img.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 302.4 302.4' style='enable-background:new 0 0 302.4 302.4;' xml:space='preserve' width='512px' height='512px'>" + svgContent + "</svg>";

	var mode_auto_img = document.createElement('div');
	container = document.createElementNS('http://www.w3.org/2000/svg','svg');
	svgContent = "<g><path d='M859.877,855.354L606.396,23.221C602.195,9.427,589.469,0,575.049,0H448.836H322.625c-14.42,0-27.146,9.426-31.347,23.221   L37.795,855.354c-6.413,21.055,9.338,42.318,31.347,42.318h181.071c15.246,0,28.479-10.515,31.922-25.367l38.312-165.216h128.39   h128.39l38.312,165.216c3.443,14.853,16.676,25.367,31.922,25.367h181.071C850.539,897.673,866.291,876.409,859.877,855.354z    M448.836,523.413h-85.578l15.191-62.147c22.096-85.624,44.192-194.726,66.29-284.493h4.097h4.097   c22.097,89.767,44.193,198.869,66.289,284.493l15.191,62.147H448.836z'/></g>";
	mode_auto_img.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 897.673 897.673' style='enable-background:new 0 0 897.673 897.673;' xml:space='preserve'>" + svgContent + "</svg>";

	var mode_cool_img = document.createElement('div');
	container = document.createElementNS('http://www.w3.org/2000/svg','svg');
	svgContent = "<g><path d='M645.527,495.815l-75.609-43.689l63.832-38.015c10.262-4.944,13.438-18.724,7.602-28.855   c-5.941-10.375-18.764-12.563-28.498-6.89l-85.107,49.849L392.488,349.51l135.258-77.894l85.107,49.768   c2.658,1.945,6.078,3.08,9.881,3.08c7.213,0,13.674-3.404,18.617-9.889c5.699-10.294,2.66-23.911-7.602-28.855l-63.832-38.015   l75.609-43.688c9.855-5.674,13.244-18.4,7.602-28.856c-5.389-10.051-18.723-13.536-28.879-7.619l-75.99,44.094l-1.135-76.03   c-0.178-11.753-9.119-21.237-20.896-21.237c-11.775,0-20.984,10.213-20.895,21.237l0.754,100.346l-134.496,77.894V155.788   l84.727-48.309c9.891-5.593,14.201-18.643,8.357-28.855c-5.934-10.375-18.115-13.456-28.498-7.619l-64.586,36.475V21.236   c0-11.753-9.5-21.236-21.277-21.236c-11.777,0-20.896,9.483-20.896,21.236v87.053l-66.871-37.285   c-10.416-5.755-22.274-2.513-28.118,7.619c-5.933,10.375-2.245,23.101,7.976,28.855l87.013,49.039v156.518l-137.542-79.353   l0.762-98.077c1.143-11.023-8.738-21.237-20.515-21.237h-0.762c-11.016,0-20.774,9.484-20.896,21.237l-0.762,73.76l-74.084-42.554   c-10.343-5.998-23.109-2.432-28.499,7.538c-5.642,10.537-2.724,22.939,7.603,28.937l74.846,43.283l-65.354,39.15   C53.96,290.664,50.758,304.443,57,314.575c4.02,6.566,9.873,9.889,17.856,9.889c4.174,0,7.651-1.054,11.015-3.08l85.489-50.498   l137.162,78.624l-137.162,79.434l-85.489-50.578c-10.262-5.998-23.49-3.161-28.872,6.89c-5.642,10.456-2.578,23.02,7.214,28.855   l65.355,38.744l-74.847,43.689c-10.302,5.998-13.642,18.643-7.603,28.937C51.342,532.614,57,536.1,64.976,536.1   c1.897,0,5.698-1.135,10.643-3.08l74.084-42.554l0.762,73.76c0.122,11.753,9.88,20.831,20.896,20.831h0.762   c11.777,0,20.604-9.808,20.515-21.642l-0.762-97.996l137.542-78.623v155.707l-87.013,49.038   c-10.383,5.836-14.015,18.562-7.976,28.856c4.223,7.214,9.881,10.699,17.856,10.699c3.802,0,7.303-0.648,10.262-2.351   l66.871-37.935v88.513c0,11.753,9.119,20.912,20.896,20.912c11.777,0,21.277-9.159,21.277-20.912v-87.054l64.586,36.476   c2.957,1.702,6.459,2.351,9.881,2.351c8.355,0,14.516-3.404,18.617-10.699c5.771-10.213,2.043-23.021-8.357-28.856l-84.727-47.498   V385.985l134.496,77.894l-0.754,99.536c-0.098,11.834,9.119,21.642,20.896,21.642s20.717-9.078,20.895-20.831l1.135-76.435   l75.99,44.499c2.934,1.702,6.84,2.27,11.023,2.27c7.977,0,13.828-3.323,17.855-9.889   C659.363,514.539,655.382,501.489,645.527,495.815z'/></g>";
	mode_cool_img.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 700.236 700.236' style='enable-background:new 0 0 700.236 700.236;' xml:space='preserve'>" + svgContent + "</svg>";

	mode_cool_img.className = "ac-mode-img";
	mode_heat_img.className = "ac-mode-img";
	mode_auto_img.className = "ac-mode-img";

	mode_cool_part.className = "mode-switch";
	mode_heat_part.className = "mode-switch";
	mode_auto_part.className = "mode-switch";

	mode_cool_part.id = "mode-cool";
	mode_heat_part.id = "mode-heat";
	mode_auto_part.id = "mode-auto";

	mode_cool_part.onclick = function() {
		ac_mode_sel(0);
	};
	mode_heat_part.onclick = function() {
		ac_mode_sel(1);
	};
	mode_auto_part.onclick = function() {
		ac_mode_sel(2);
	};


	//mode_cool_img.src = "./img/cool.svg";
	//mode_heat_img.src = "./img/heat.svg";
	//mode_auto_img.src = "./img/auto.svg";

	mode_cool_part.style.fill = "#539aff";

	mode_cool_part.appendChild(mode_cool_img);
	mode_heat_part.appendChild(mode_heat_img);
	mode_auto_part.appendChild(mode_auto_img);

	// Temp
	var temp_part = document.createElement('div');
	var temp_up = document.createElement('div');
	var temp_down = document.createElement('div');
	var temp_value = document.createElement('div');

	temp_part.id = "temp-part";

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

	temp_part.appendChild(temp_up);
	temp_part.appendChild(temp_value);
	temp_part.appendChild(temp_down);
	
	// Fan
	var fan_part = document.createElement('div');
	var fan_low = document.createElement('div');
	var fan_med = document.createElement('div');
	var fan_high = document.createElement('div');

	fan_part.id = "fan-part";
	fan_low.id = "fan-low";
	fan_med.id = "fan-med";
	fan_high.id = "fan-high";

	fan_low.textContent = "弱";
	fan_med.textContent = "中";
	fan_high.textContent = "强";

	fan_low.onclick = function() {
		ac_fan_sel(0);
	};

	fan_med.onclick = function() {
		ac_fan_sel(1);
	};

	fan_high.onclick = function() {
		ac_fan_sel(2);
	};

	fan_part.appendChild(fan_low);
	fan_part.appendChild(fan_med);
	fan_part.appendChild(fan_high);

	addBlockTitle(ac_block, "空调");

	ac_block.appendChild(mode_heat_part);
	ac_block.appendChild(mode_cool_part);
	ac_block.appendChild(mode_auto_part);

	ac_block.appendChild(temp_part);
	ac_block.appendChild(fan_part);


}

/*
	0:cool
	1:heat
	2:auto
*/
function ac_mode_sel(mode) {
	var mode_cool = document.getElementById("mode-cool");
	var mode_heat = document.getElementById("mode-heat");
	var mode_auto = document.getElementById("mode-auto");

	mode_cool.style.fill = "#efefef";
	mode_heat.style.fill = "#efefef";
	mode_auto.style.fill = "#efefef";

	switch(mode) {
		case 0:
			mode_cool.style.fill = "#539aff";
			break;
		case 1:
			mode_heat.style.fill = "#ff5a57";
			break;
		case 2:
			mode_auto.style.fill = "#438ac7";
			break;
	}
}

/*
	0:low
	1:medium
	2:high
*/
function ac_fan_sel(mode) {
	var fan_low = document.getElementById("fan-low");
	var fan_med = document.getElementById("fan-med");
	var fan_high = document.getElementById("fan-high");

	fan_low.style.background = "#fff";
	fan_med.style.background = "#fff";
	fan_high.style.background = "#fff";

	fan_low.style.color = "#438ac7";
	fan_med.style.color = "#438ac7";
	fan_high.style.color = "#438ac7";

	switch(mode) {
		case 0:
			fan_low.style.background = "#438ac7";
			fan_low.style.color = "#fff";
			break;
		case 1:
			fan_med.style.background = "#438ac7";
			fan_med.style.color = "#fff";
			break;
		case 2:
			fan_high.style.background = "#438ac7";
			fan_high.style.color = "#fff";
			break;
	}
}