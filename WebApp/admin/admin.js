var switches = [];

function getSwitchById(id) {
    for(var i=0; i< switches.length; i++) {
        if(switches[i].id == id) {
            return switches[i];
        }
    }
}

function ClearRows() {
    const rows = document.getElementsByClassName("row");
    const display = document.getElementById("display");
    while(document.getElementsByClassName("row").length > 0)
        display.removeChild(document.getElementsByClassName("row")[0]);
}

function GetSwitches() {
    console.log("Get Switch");
    var request = new XMLHttpRequest();
    request.open("GET", "li?show=switch");
    request.onreadystatechange = function() {
        if(request.readyState==4) {
            var display = document.getElementById("display");
        
            switches = JSON.parse(request.responseText);
            console.log(switches);

            ClearRows();

            for(var i=0; i<switches.length; i++) {
                var row = document.createElement("div");
                row.className = "row";
                row.id = "row-" + switches[i].id;

                var id = document.createElement("div");
                id.textContent = switches[i].id;
                var room = document.createElement("div");
                room.textContent = switches[i].room.floor + "楼" + switches[i].room.name + switches[i].name;
                var number = document.createElement("div");
                // number.textContent = parseInt((switches[i].id - parseInt(switches[i].id / 100) * 100));
                number.textContent = switches[i].cases.length;
                var status = document.createElement("div");
                status._id = switches[i].id;
                status.textContent = "查看";
                status.style.color = "rgba(51, 122, 183, 0.95)";
                status.onclick = function() {
                    var _switch = getSwitchById(this._id);
                    var display = document.getElementById("display");
                    var rows = document.getElementsByClassName("row");
                    var next_row = null;
                    for(var j=0; j<rows.length; j++) {
                        if(rows[j].id == "row-" + this._id && j < rows.length - 1)
                            next_row = rows[j + 1];
                    }
                    
                    
                    if(this.textContent == "查看") {
                        this.textContent = "收起";

                        while(document.getElementsByClassName("case-row").length > 0) {
                            display.removeChild(document.getElementsByClassName("case-row")[0]);
                        }
        
                        for(var i=0; i<_switch.cases.length; i++) {
                            var _case = _switch.cases[i];
                            var _case_row = document.createElement("div");
                            _case_row.className = "case-row";
                            var _case_number = document.createElement("div");
                            _case_number.textContent = i;
                            var _case_name = document.createElement("div");
                            _case_name.textContent = _case.name;
                            var _case_code = document.createElement("div");
                            _case_code.textContent = _case.code;
                            _case_row.appendChild(_case_number);
                            _case_row.appendChild(_case_name);
                            _case_row.appendChild(_case_code);
                            if(next_row) {
                                display.insertBefore(_case_row, next_row);
                            }
                            else {
                                display.appendChild(_case_row);
                            }
                        }
                    } else {
                        this.textContent = "查看";

                        while(document.getElementsByClassName("case-row").length > 0) {
                            display.removeChild(document.getElementsByClassName("case-row")[0]);
                        }
                    }   
                };

                row.appendChild(id);
                row.appendChild(room);
                row.appendChild(number);
                row.appendChild(status);
                
                display.appendChild(row);
            }
        }
        
        
        
    }
    request.send(null);
}

function ToggleFloor() {
    var add_floor = document.getElementById("add-floor");
    var dropdown = document.getElementById("add-floor-dropdown");
    
    if(dropdown.style.display == "flex") {
        dropdown.style.display = "none";
    } else {
        var request = new XMLHttpRequest();
        request.open("GET", "li?show=floor");
        request.onreadystatechange = function() {
            if(request.readyState == 4) {
                removeAllChild(dropdown);
                var floor = JSON.parse(request.responseText);
                for(var i=0; i<floor.length; i++) {
                    var div = document.createElement("div");
                    div.textContent = floor[i];

                    div.onclick = function() {
                        document.getElementById("add-floor").value = this.id;
                        document.getElementById("add-floor-label").textContent = this.textContent;
                        var request = new XMLHttpRequest();
                        request.open("GET", "li?show=room&floor=" + this.textContent);
                        request.onreadystatechange = function() {
                            if(request.readyState == 4) {
                                var room = JSON.parse(request.responseText)[0];
                                document.getElementById("add-room-label").textContent = room.name;
                                if(document.getElementById("add-id-label")) {
                                    document.getElementById("add-id-label").textContent = GetNextSwitchId(room.id);
                                }
                            }
                        };
                        request.send(null);
                    }

                    dropdown.appendChild(div);
                }
                dropdown.style.display = "flex";
            }
        };
        request.send(null);
    }
}

function ToggleRoom() {
    var add_floor_label = document.getElementById("add-floor-label");
    var dropdown = document.getElementById("add-room-dropdown");
    
    if(dropdown.style.display == "flex") {
        dropdown.style.display = "none";
    } else {
        var request = new XMLHttpRequest();
        request.open("GET", "li?show=room&floor=" + add_floor_label.textContent);
        request.onreadystatechange = function() {
            removeAllChild(dropdown);
            var device = JSON.parse(request.responseText);
            for(var i=0; i<device.length; i++) {
                var div = document.createElement("div");
                div.id = device[i].id;
                div.textContent = device[i].name;

                div.onclick = function() {
                    document.getElementById("add-room").value = this.id;
                    document.getElementById("add-room-label").textContent = this.textContent;

                    if(document.getElementById("add-id-label")) {
                        document.getElementById("add-id-label").textContent = GetNextSwitchId(this.id);
                    }
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

function GetNextSwitchId(room_id) {
    var last_switch_id = -1;
    room_id = parseInt(room_id);
    for(var i=0; i<switches.length; i++) {
        switch_id = parseInt(switches[i].id);
        console.log(switch_id + " " + (room_id + 1) * 100);
        if(switch_id < (room_id + 1) * 100 && switch_id > room_id * 100 && (switch_id == last_switch_id + 1 || last_switch_id == -1)) {
            
            last_switch_id = switch_id;
        }

        if(switch_id > (room_id + 1) * 100) {
            break;
        }
    }

    if(last_switch_id != -1) {
        return last_switch_id + 1;
    } else {
        return room_id * 100 + 1;
    }
}

function ShowAddOverlay(type, callback) {
    // var add_overlay = document.getElementById("add-overlay");
    // add_overlay.style.display = "flex";

    var overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.id = "add-overlay";
    var add_display = document.createElement("div");
    add_display.id = "add-display";

    var add_title = document.createElement("div");
    add_title.className = "add-title";
    if(type == "switch") {
        var title_id = document.createElement("div");
        title_id.textContent = "新开关 ID";
        var title_floor = document.createElement("div");
        title_floor.textContent = "楼层";
        var title_room = document.createElement("div");
        title_room.textContent = "房间";
        var title_number = document.createElement("div");
        title_number.textContent = "选项数量";

        add_title.appendChild(title_id);
        add_title.appendChild(title_floor);
        add_title.appendChild(title_room);
        add_title.appendChild(title_number);
    }

    var add_row = document.createElement("div");
    add_row.className = "add-row";
    
    if(type == "switch") {
        var id_element = document.createElement("div");
        id_element.className = "add-elem";
        id_element.id = "add-id";
        var id_label = document.createElement("div");
        id_label.id = "add-id-label";
        id_label.textContent = GetNextSwitchId(11);

        id_element.appendChild(id_label);
        add_row.appendChild(id_element);

        var floor_element = document.createElement("div");
        floor_element.className = "add-elem";
        floor_element.id = "add-floor";
        floor_element.onclick = ToggleFloor;
        
        var floor_label = document.createElement("div");
        floor_label.id = "add-floor-label";
        floor_label.textContent = "1";
        var floor_dropdown = document.createElement("div");
        floor_dropdown.className = "add-dropdown";
        floor_dropdown.id = "add-floor-dropdown";

        floor_element.appendChild(floor_label);
        floor_element.appendChild(floor_dropdown);

        add_row.appendChild(floor_element);

        var room_element = document.createElement("div");
        room_element.className = "add-elem";
        room_element.id = "add-room";
        room_element.onclick = ToggleRoom;
        
        var room_label = document.createElement("div");
        room_label.id = "add-room-label";
        room_label.textContent = "客厅";
        var room_dropdown = document.createElement("div");
        room_dropdown.className = "add-dropdown";
        room_dropdown.id = "add-room-dropdown";

        room_element.appendChild(room_label);
        room_element.appendChild(room_dropdown);

        add_row.appendChild(room_element);

        var number_element = document.createElement("div");
        number_element.className = "add-elem";
        number_element.id = "add-number";
        
        var number_input = document.createElement("input");
        number_input.id = "add-number-input";
        number_input.value = 4;

        number_element.appendChild(number_input);

        add_row.appendChild(number_element);
    }

    add_display.appendChild(add_title);
    add_display.appendChild(add_row);
    // var title_device = document.createElement("div");
    // var title_action = document.createElement("div");
    var add_footer = document.createElement("div");
    add_footer.id = "add-footer";
    var add_confirm_btn = document.createElement("div");
    add_confirm_btn.className = "add-btn";
    add_confirm_btn.textContent = "确认";
    add_footer.appendChild(add_confirm_btn);
    var add_back_btn = document.createElement("div");
    add_back_btn.className = "add-btn";
    add_back_btn.textContent = "返回";
    add_back_btn.onclick = HideAddOverlay;
    add_footer.appendChild(add_back_btn);

    add_display.appendChild(add_footer);

    overlay.appendChild(add_display);
    document.body.appendChild(overlay);

    overlay.style.display = "flex";

    console.log("SHOW");
}

function ShowAddDeviceOverlay() {
    var add_overlay = document.getElementById("add-overlay");
    add_overlay.style.display = "flex";
}

function HideAddOverlay() {
    var add_overlay = document.getElementById("add-overlay");
    document.body.removeChild(add_overlay);
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

function ShowItemAddOverlay() {
    ShowAddOverlay("switch");
}

function AddItem() {
    console.log("ADD");
    ShowItemAddOverlay();
}

GetSwitches();