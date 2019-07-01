// This module is written for sqlite support.
var sqlite3 = require('sqlite3');
var load_finished = false;
var db;

function Load(){
    db = new sqlite3.Database("./retran.db", function(err){
		if (err)
			throw err;
	});
	
	db.all("SELECT * FROM MAIN_TABLE", function(err, _data) {
		data.rs485 = _data;
        console.log('[INFO] RS485命令载入完成. Retran data loaded. ');
        load_finished = true;
	});
}

exports.Load = Load;
exports.ready = load_finished;