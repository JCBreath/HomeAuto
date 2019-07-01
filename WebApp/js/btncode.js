function reqBtnCode() {
	var request = new XMLHttpRequest();
	request.open("GET", "query?var=btncode");
	request.onreadystatechange = function() {

		if (request.readyState !== 4) {
			return;
		}

		if (request.status === 200) {
			btncode_callback(request.responseText);
		}
	
	};
	
	request.send(null);
}

function btncode_callback(str) {
	btncode = JSON.parse(str);
}

function loadBtn() {
	if(btncode != null) {
		appendUserFillBlock();
		for(var i=0;i<btncode.length;i++) {
			addTestBtn(btncode[i].ID, btncode[i].NAME);
		}
	}
}

function addTestBtn(id, name) {
	appendTestBtn(name, function(){
		console.log(id);
		// if(ws_connected)
		// 	ws_send("BTNID=" + id);
		var request = new XMLHttpRequest();
		request.open("GET", "rs?btn_id=" + id);
		request.onreadystatechange = function() {
			if (request.readyState !== 4) {
				return;
			}
	
			if (request.status === 200) {
				console.log("发送485成功")
			}
		};
		
		request.send(null);
	});
}

function appendTestBtn(title, func) {
	var user_block = document.createElement('div');
	user_block.className = "user-blk";
	user_block.onclick = func;
	var user_block_title = document.createElement('div');
	user_block_title.className = "user-blk-title";

	user_block_title.textContent = title;

	

	var user_arrow = document.createElement('div');
	user_arrow.className = "fa fa-angle-right user-blk-arrow";


	user_block.appendChild(user_block_title);
	user_block.appendChild(user_arrow);
	document.getElementById('display').appendChild(user_block);
}

var btncode = null;

reqBtnCode();