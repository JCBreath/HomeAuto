var selected = 1;

function init() {

}

function reset() {
	var contents = document.getElementsByClassName("content");
	for(let i = 0; i < contents.length; i++) {
		contents[i].style.height = "100%";
		contents[i].style.border = "0px solid #ebeffe";
		contents[i].style.background = "#57968e";
	}
}

function select(index) {
	reset();
	var content = document.getElementById("content-"+index);
	content.style.height = "98%";
	content.style.border = "2px solid #ebeffe";
	content.style.background = "#5b5f9e";
	selected = index;
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