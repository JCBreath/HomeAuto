var fs = require("fs");
var XLSX = require("xlsx");

// console.log(String.fromCharCode(65+0));
// console.log("A".charCodeAt());

var buff = fs.readFileSync("./data.xlsx");
var wb = XLSX.read(buff, {type:'buffer'});

function LoadRS485() {
    var rs_json_raw = wb.Sheets["RS485"];
    var rss = [];

    for(var i=parseInt(rs_json_raw["!ref"].split(":")[0].substr(1)) + 1; i<parseInt(rs_json_raw["!ref"].split(":")[1].substr(1)) + 1; i++) {
        var rs = {};
        rs.id = rs_json_raw["A" + i].v;
        rs.code = rs_json_raw["B" + i].v;
        rs.note = rs_json_raw["C" + i].v;
        rss.push(rs);
    }

    data.rs485 = rss;
    console.log(rss);
    console.log("[INFO] RS485数据已从EXCEL载入");
}

// var room_json_raw = JSON.parse(JSON.stringify(wb.Sheets["ROOM"]).replace(/\!+/g, ""));
function LoadRoom() {
    var room_json_raw = wb.Sheets["ROOM"];
    var rooms = [];

    for(var i=parseInt(room_json_raw["!ref"].split(":")[0].substr(1)) + 1; i<parseInt(room_json_raw["!ref"].split(":")[1].substr(1)) + 1; i++) {
        var room = {};
        room.id = room_json_raw["A" + i].v;
        room.name = room_json_raw["B" + i].v;
        room.floor = room_json_raw["C" + i].v;
        rooms.push(room);
    }

    data.rooms = rooms;
    console.log("[INFO] 房间数据已从EXCEL载入");
}



// console.log(rooms);
function LoadDevice() {
    var device_json_raw = wb.Sheets["DEVICE"];
    var devices = [];

    for(var i=parseInt(device_json_raw["!ref"].split(":")[0].substr(1)) + 1; i<parseInt(device_json_raw["!ref"].split(":")[1].substr(1)) + 1; i++) {
        var device = {};
        device.id = device_json_raw["A" + i].v;
        device.name = device_json_raw["B" + i].v;
        device.type = device_json_raw["C" + i].v;
        device.room = device_json_raw["D" + i].v;
        device.floor = device_json_raw["E" + i].v;
        device.status = device_json_raw["F" + i].v;
        if(device_json_raw["G" + i] && device_json_raw["H" + i]) {
            device.controls = [device_json_raw["G" + i].v, device_json_raw["H" + i].v];
        } else {
            continue;
        }
        
        devices.push(device);
    }

    // console.log(devices);

    data.devices = devices;
    console.log("[INFO] 设备数据已从EXCEL载入");
}

exports.LoadRS485 = LoadRS485;
exports.LoadRoom = LoadRoom;
exports.LoadDevice = LoadDevice;