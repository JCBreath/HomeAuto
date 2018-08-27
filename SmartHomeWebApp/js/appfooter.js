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
	display_fill_top.style.height = "30px";
	display.appendChild(display_fill_top);

	// 1: Home
	// 2: Control
	// 3: Favorites
	// 4: User
	switch(index) {
		case 1:
			changeHeaderTitle("Dashboard");
			showWeatherBlock();
			showConsumptionBlock();
			showNoteBlock();
			break;
		case 2:
			changeHeaderTitle("Living Room");
			allowHeaderDropDown();
			addDropDown();
			showControlBlock(1);
			showACBlock(1);
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
	

	room_count = 3;

	for(var i=0; i<room_count; i++) {
		var room = document.createElement('a');

		room.className = "dropdown-element";
		room.textContent = "Room" + i;

		dropdown.appendChild(room);
	}

	display = document.getElementById("display");
	display.appendChild(dropdown);
}

function toggleDropDown() {
	dropdown = document.getElementById("dropdown");

	if(dropdown.style.display == "none") {
		dropdown.style.display = "block";
	} else {
		dropdown.style.display = "none"
	}
}