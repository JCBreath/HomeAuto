var room_list = ["总览", "一楼", "二楼", "三楼", "四楼"];


function switchDisplay(index) {
	var selected = document.getElementsByClassName("navi-btn-sel")[0];
	selected.className = ("navi-btn");
	selected = document.getElementById("navi-" + index);
	selected.className = ("navi-btn-sel");

	removeAllChild(document.getElementById("display"));

	var display = document.getElementById('display');
	var display_fill_top = document.createElement('div');
	var display_fill_bottom = document.createElement('div');
	
	display_fill_top.className = "display-fill";
	display_fill_top.style.height = "40px";
	display.appendChild(display_fill_top);

	$(window).scrollTop(0);
	// 1: Home
	// 2: Control
	// 3: Favorites
	// 4: User
	switch(index) {
		case 1:
			changeHeaderTitle("主页");
			showWeatherBlock();
			showConsumptionBlock();
			showNoteBlock();
			break;
		case 2:
			changeHeaderTitle("总览");
			allowHeaderDropDown();
			addDropDown();
			showControlBlock(1);
			break;
		case 3:
			changeHeaderTitle("喜爱");
			loadBtn();
			break;
		case 4:
			changeHeaderTitle("用户");
			showUserUI();
			break;
	}

	display_fill_bottom.className = "display-fill";
	display_fill_bottom.style.height = "130px";
	display.appendChild(display_fill_bottom);
}

function allowHeaderDropDown() {
	dropdown_btn = document.createElement('div');
	dropdown_btn.id = "dropdown-btn";
	dropdown_btn.className = "fa fa-angle-down";
	dropdown_btn.onclick = function() {
		toggleDropDown();
		if(this.className == "fa fa-angle-up")
			this.className = "fa fa-angle-down";
		else
			this.className = "fa fa-angle-up";
	};
	header = document.getElementById("header-title");
	header.appendChild(dropdown_btn);

}

function addDropDown() {
	dropdown = document.createElement('div');
	dropdown.id = "dropdown";
	dropdown.style.display = "none";
	dropdown.onclick = function() {
		
	};
	

	for(var i=0; i<room_list.length; i++) {
		var room = document.createElement('a');

		room.className = "dropdown-element";
		room.textContent = room_list[i];
		room.onclick = function() {
			changeHeaderTitle(this.textContent);
			if(this.textContent == "一楼") {
				showControlBlock("floor", 1);
				toggleDropDown();
				allowHeaderDropDown();
			} else if(this.textContent == "二楼") {
				showControlBlock("floor", 2);
				toggleDropDown();
				allowHeaderDropDown();
			} else if(this.textContent == "三楼") {
				showControlBlock("floor", 3);
				toggleDropDown();
				allowHeaderDropDown();
			} else if(this.textContent == "四楼") {
				showControlBlock("floor", 4);
				toggleDropDown();
				allowHeaderDropDown();
			} else if(this.textContent == "总览") {
				showControlBlock();
				toggleDropDown();
				allowHeaderDropDown();
			}
		};

		dropdown.appendChild(room);
	}

	display = document.getElementById("display");
	display.appendChild(dropdown);
}

function toggleDropDown() {
	dropdown = document.getElementById("dropdown");

	if(dropdown.style.display == "none") {
		dropdown.style.display = "block";
		$(window).scrollTop(0);
	} else {
		dropdown.style.display = "none"
	}
}


