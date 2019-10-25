var fs = require("fs");
var XLSX = require("xlsx");

// console.log(String.fromCharCode(65+0));
// console.log("A".charCodeAt());

var buff = fs.readFileSync("./data.xlsx");
var wb = XLSX.read(buff, {type:'buffer'});

function LoadXLSX(file_name) {
    buff = fs.readFileSync(file_name);
    wb = XLSX.read(buff, {type:'buffer'});
}

function LoadSheet(sheet_name, start_index, var_names) {
    var json_raw = wb.Sheets[sheet_name];
    var list = [];

    for(var i=parseInt(json_raw["!ref"].split(":")[0].substr(1)) + start_index; i<parseInt(json_raw["!ref"].split(":")[1].substr(1)) + 1; i++) {
        if(json_raw["A" + i]) {
            var item = {};
            for(var j=0; j<var_names.length; j++) {
                if(json_raw[String.fromCharCode(65+0) + i]) {
                    if(j > 0 && var_names[j] == var_names[j-1]) {
                        if(item[var_names[j]] && item[var_names[j]].length == undefined) {
                            item[var_names[j]] = [item[var_names[j]]];
                        }
                        item[var_names[j]].push(json_raw[String.fromCharCode(65+j) + i].v);
                    } else if(var_names[j][var_names[j].length - 1] == '+') {
                        var var_name = var_names[j].substr(0, var_names[j].length - 1);
                        item[var_name] = [];
                        while(json_raw[String.fromCharCode(65+j) + i]) {
                            item[var_name].push(json_raw[String.fromCharCode(65+j) + i].v);
                            j += 1;
                        }
                    } else {
                        item[var_names[j]] = json_raw[String.fromCharCode(65+j) + i].v;
                    }
                }
            }
            
            list.push(item);
        }
    }

    return list;
}

function ExportSheet(json, end, sheet_name, file_name) {
    json[0].id = 666;

    var ss = XLSX.utils.json_to_sheet(json);
    
    let ref = "A1:" + end + json.length + 1;

    wb.Sheets[sheet_name] = Object.assign({},ss,{'!ref': ref});

    XLSX.writeFile(wb, file_name);
}

function LoadSwitch() {
    var json_raw = wb.Sheets["SWITCH"];
    var obj = {};

    for(var i=parseInt(json_raw["!ref"].split(":")[0].substr(1)) + 1; i<parseInt(json_raw["!ref"].split(":")[1].substr(1)) + 1; i++) {
        var _switch_id, _switch_case, _switch_case_name, _switch_case_code;
        if(json_raw["A" + i]) {
            _switch_id = json_raw["A" + i].v;
        }

        if(json_raw["B" + i]) {
            _switch_case_name = json_raw["B" + i].v;
            if(json_raw["B" + i].v == "开")
                _switch_case = 1;
            else if (json_raw["B" + i].v == "关")
                _switch_case = 2;
            else if (json_raw["B" + i].v == "双击")
                _switch_case = 3;
            else if (json_raw["B" + i].v == "点动")
                _switch_case = 4;
        }

        if(json_raw["C" + i]) {
            _switch_case_code = "D" + json_raw["C" + i].v;
        }

        var _switch_case_obj = {
            name: _switch_case_name,
            code: _switch_case_code
        };

        if(!obj[_switch_id]) {
            obj[_switch_id] = {};
        }

        if(!obj[_switch_id].cases) {
            obj[_switch_id].cases = {};
        }

        obj[_switch_id].cases[_switch_case] = _switch_case_obj;
    }

    return obj;
}

exports.LoadSwitch = LoadSwitch;

exports.ExportSheet = ExportSheet;
exports.LoadSheet = LoadSheet;
exports.LoadXLSX = LoadXLSX;