function GetSwitches() {
    var request = new XMLHttpRequest();
    request.open("GET", "li?show=switch");
    request.onreadystatechange = function() {
        var display = document.getElementsByClassName("display")[0];
        
        var switches = JSON.parse(request.responseText);

        for(var i=0; i<switches.length; i++) {
            var row = document.createElement("div");
            row.className = "row";

            var id = document.createElement("div");
            id.textContent = switches[i].id;
            var room = document.createElement("div");
            room.textContent = switches[i].room.floor + "楼" + switches[i].room.name;
            var number = document.createElement("div");
            console.log(switches[i].id);
            number.textContent = parseInt((switches[i].id - parseInt(switches[i].id / 100) * 100));
            var status = document.createElement("div");
            status.textContent = id - parseInt(id / 10) * 10;

            row.appendChild(id);
            row.appendChild(room);
            row.appendChild(number);
            row.appendChild(status);
            
            display.appendChild(row);
        }
        
    }
    request.send(null);
}

function ToggleFloor() {
    var display = document.getElementById("add-display");
    var row = display.childNodes[3];
    
    var add_floor = row.childNodes[1];
    var dropdown = add_floor.childNodes[3];
    
    if(dropdown.style.display == "flex") {
        dropdown.style.display = "none";
    } else {
        var request = new XMLHttpRequest();
        request.open("GET", "li?show=floor");
        request.onreadystatechange = function() {
            removeAllChild(dropdown);
            var floor = JSON.parse(request.responseText);
            for(var i=0; i<floor.length; i++) {
                var div = document.createElement("div");
                div.textContent = floor[i];

                div.onclick = function() {
                    this.parentNode.parentNode.value = this.id;
                    this.parentNode.parentNode.childNodes[1].textContent = this.textContent;
                }

                dropdown.appendChild(div);
            }
            dropdown.style.display = "flex";
        };
        request.send(null);
    }
}

function ToggleRoom() {
    var display = document.getElementById("add-display");
    var row = display.childNodes[3];
    
    var add_floor = row.childNodes[1];
    var add_room = row.childNodes[3];
    var dropdown = add_room.childNodes[3];
    
    if(dropdown.style.display == "flex") {
        dropdown.style.display = "none";
    } else {
        var request = new XMLHttpRequest();
        request.open("GET", "li?show=room&floor=" + add_floor.childNodes[1].textContent);
        request.onreadystatechange = function() {
            removeAllChild(dropdown);
            var device = JSON.parse(request.responseText);
            for(var i=0; i<device.length; i++) {
                var div = document.createElement("div");
                div.id = device[i].id;
                div.textContent = device[i].name;

                div.onclick = function() {
                    this.parentNode.parentNode.value = this.id;
                    this.parentNode.parentNode.childNodes[1].textContent = this.textContent;
                }

                dropdown.appendChild(div);
            }
            dropdown.style.display = "flex";
        };
        request.send(null);
    }
}

function ToggleDevice() {
    var display = document.getElementById("add-display");
    var row = display.childNodes[3];
    
    
    var add_room = row.childNodes[3];
    console.log(add_room);
    var add_device = row.childNodes[5];
    var dropdown = add_device.childNodes[3];
    
    if(dropdown.style.display == "flex") {
        dropdown.style.display = "none";
    } else {
        var request = new XMLHttpRequest();
        request.open("GET", "li?show=device&room=" + add_room.value);
        request.onreadystatechange = function() {
            console.log(request.responseText);
            removeAllChild(dropdown);
            var device = JSON.parse(request.responseText);
            for(var i=0; i<device.length; i++) {
                var div = document.createElement("div");
                div.id = device[i].id;
                div.textContent = device[i].name;

                div.onclick = function() {
                    this.parentNode.parentNode.value = this.id;
                    this.parentNode.parentNode.childNodes[1].textContent = this.textContent;
                }

                dropdown.appendChild(div);
            }
            dropdown.style.display = "flex";
        };
        request.send(null);
    }
}

function ToggleRS485() {
    var display = document.getElementById("add-display");
    var row = display.childNodes[3];
    
    var add_device = row.childNodes[5];
    var add_rs485 = row.childNodes[7];
    var dropdown = add_rs485.childNodes[3];
    
    if(dropdown.style.display == "flex") {
        dropdown.style.display = "none";
    } else {
        var request = new XMLHttpRequest();
        request.open("GET", "li?show=rs485&device=" + add_device.value);
        request.onreadystatechange = function() {
            console.log(request.responseText);
            removeAllChild(dropdown);
            var device = JSON.parse(request.responseText);
            for(var i=0; i<device.length; i++) {
                var div = document.createElement("div");
                div.id = device[i].id;
                div.textContent = device[i].note;

                div.onclick = function() {
                    this.parentNode.parentNode.value = this.id;
                    this.parentNode.parentNode.childNodes[1].textContent = this.textContent;
                }

                dropdown.appendChild(div);
            }
            dropdown.style.display = "flex";
        };
        request.send(null);
    }
}

function closeAllDropdowns() {

}

function ShowDetailOverlay () {
    var detail_overlay = document.getElementById("detail-overlay");
    detail_overlay.style.display = "flex";
}

function HideDetailOverlay () {
    var detail_overlay = document.getElementById("detail-overlay");
    detail_overlay.style.display = "none";
}

function ShowAddOverlay() {
    
}

function ShowAddDeviceOverlay() {
    var add_overlay = document.getElementById("add-overlay");
    add_overlay.style.display = "flex";
}

function HideAddOverlay() {
    var add_overlay = document.getElementById("add-overlay");
    add_overlay.style.display = "none";
}

function ConfirmAdd() {
    var add_display = document.getElementById("add-display");
    var add_row = add_display.childNodes[3];
    var detail_display = document.getElementById("detail-display");

    var action_text = add_row.childNodes[1].childNodes[1].textContent + "楼" + add_row.childNodes[3].childNodes[1].textContent + add_row.childNodes[5].childNodes[1].textContent + add_row.childNodes[7].childNodes[1].textContent;
    var action_code = add_display.childNodes[3].childNodes[7].value;
    
    var detail_row = document.createElement("div");
    detail_row.className = "detail-row";
    detail_row.textContent = action_text;
    detail_row.value = action_code;
    console.log(action_code);

    detail_display.insertBefore(detail_row, detail_display.childNodes[detail_display.childNodes.length - 2]);

    HideAddOverlay();
}

function removeAllChild(node) {
	while (node.firstChild) {
    	node.removeChild(node.firstChild);
    }
}

GetSwitches();