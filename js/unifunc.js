function removeAllChild(node) {
	while (node.firstChild) {
    	node.removeChild(node.firstChild);
    }
}

function addBlockTitle(block, str) {
	var title = document.createElement('div');
	var title_text = document.createElement('a');

	title.className = "blk-title";
	title_text.className = "blk-title-text";
	title_text.textContent = str;

	title.appendChild(title_text);
	block.appendChild(title);
}

function changeHeaderTitle(str) {
	var title = document.getElementById('header-title');

	title.textContent = str;
}