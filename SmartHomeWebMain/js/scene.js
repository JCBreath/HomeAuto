var selected = 1;



function init() {
	console.log("initialize");

	var oReq = new XMLHttpRequest();
	var URL = "query?var=scene";

	oReq.open("GET", URL);
	oReq.addEventListener("load", function() {
		select(this.responseText);
	});
	oReq.send();
}

function select(index) {
	reset_blocks();
	var content = document.getElementById("content-"+index);
	content.style.height = "98%";
	content.style.border = "2px solid #ebeffe";
	content.style.background = "#5b5f9e";

	console.log(index);

	var oReq = new XMLHttpRequest();
	var URL = "query?scene=" + index;

	oReq.open("GET", URL);
	oReq.addEventListener("load", function() {
		selected = index;
	});
	oReq.send();
}

function reset_blocks() {
	var contents = document.getElementsByClassName("content");
	for(var i = 0; i < contents.length; i++) {
		contents[i].style.height = "100%";
		contents[i].style.border = "0px solid #ebeffe";
		contents[i].style.background = "#57968e";
	}
}

function mouseover(index) {
	var content = document.getElementById("content-"+index);
	if(index != selected)
		content.style.background = "#67a69e";
}

function mouseleave(index) {
	var content = document.getElementById("content-"+index);
	if(index != selected)
			content.style.background = "#57968e";
}

function mousedown(index) {
	var content = document.getElementById("content-"+index);
	if(index != selected)
		content.style.background = "#67a69e";
}

function mouseup(index) {
	var content = document.getElementById("content-"+index);
	if(index != selected)
		content.style.background = "#57968e";
}

init();