function showNoteBlock() {
	var display = document.getElementById('display');
	var note_block = document.createElement('div');
	note_block.id = "note-blk-1";
	note_block.className = "note-blk";
	display.appendChild(note_block);

	// for test use
	updateNote(0);

	// TODO:
	// req from server, stat for now
	//ReqWeatherFromYahoo("davis", "ca");
}

function ReqNote(city, state) {
	var oReq = new XMLHttpRequest();
	var reqURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22davis%2C%20ca%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	oReq.open("GET", reqURL);
	oReq.addEventListener("load", function() {
		updateWeather(JSON.parse(this.responseText));
	});
	oReq.send();
}

function updateNote(data) {
	var note_block = document.getElementById('note-blk-1');
	var note_text = document.createElement('a');
	var note_author = document.createElement('a');
	
	/*
	var loc_part = document.createElement('div');
	var loc_text = document.createElement('a');
	var navi_img = document.createElement('img');
	var cond_img = document.createElement('img');
	*/

	note_text.className = "note-text";
	note_author.className = "note-author";

	note_text.textContent = "I'll be back at 9 pm.";
	note_author.textContent = "- " + "Jim";
	/*
	temp_text.textContent = data.query.results.channel.item.condition.temp + "°";
	cond_text.textContent = data.query.results.channel.item.condition.text;
	navi_img.src = "./img/navigation.svg";
	cond_img.src = "./img/sun.svg";
	*/
	addBlockTitle(note_block, "备忘");
	note_block.appendChild(note_text);
	note_block.appendChild(note_author);
}

switchDisplay(1);

/*
var display = document.getElementById('display');
var display_fill = document.createElement('div');
	
display_fill.id = "display-fill";
display.appendChild(display_fill);
*/