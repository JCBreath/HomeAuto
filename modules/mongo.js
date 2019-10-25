var MongoClient = require('mongodb').MongoClient;
var db_name = "smarthome";
var url = "mongodb://192.168.1.23:27017/" + db_name;


function InsertItem(collection_name, item, callback) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection(collection_name);

        collection.insert(item, function(err, result) {
            if(err) console.log("[ERROR] " + err);
            if(callback) callback(result);
            else {
                console.log("[INFO] MongoDB: Item is successfully inserted in collection '" + collection_name + "'.");
                console.log(result);
            }
        });

        db.close();
    });
}

function InsertList(collection_name, list, callback) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection(collection_name);
        var count = 0;
        var results = [];

        for(var i=0; i<list.length; i++) {
            var item = list[i];
            collection.insert(item, function(err, result) {
                if(err) console.log("[ERROR] " + err);
                count++;
                results.push(result);
                if(count == list.length) {
                    console.log("[INFO] MongoDB: A list of " + list.length + " items are successfully inserted in collection '" + collection_name + "'.");
                    if(callback) callback(results);
                    //FindItem(collection_name, "", undefined); // Show the whole collection
                }
            });
        }

        db.close();
    });
}

function Find(collection_name, where_obj, callback) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection(collection_name);
        collection.find(where_obj).toArray(function(err, result) {
            if(err) console.log("[ERROR] " + err);
            if(callback) callback(result);
            else {
                console.log("[INFO] MongoDB: " + result.length + " items are found in collection '" + collection_name + "'.");
                // console.log(result);
            }
        });

        db.close();
    });
}

function Remove(collection_name, where_obj, callback) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection(collection_name);
        collection.remove(where_obj, function(err, result) {
            if(err) console.log("[ERROR] " + err);
            if(callback) callback(result);
            else {
                console.log("[INFO] MongoDB: " + result.result.n + " items are removed in collection '" + collection_name + "'.");
                // console.log(result);
            }
        });

        db.close();
    });
}


// Update must use complete object, it changes the selected object to the new one.
function Update(collection_name, where_obj, item_obj, callback) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection(collection_name);
        collection.update(where_obj, item_obj, function(err, result) {
            if(err) console.log("[ERROR] " + err);
            if(callback) callback(result);
            else {
                console.log("[INFO] MongoDB: " + result.result.n + " items are updated in collection '" + collection_name + "'.");
                // console.log(result);
            }
        });

        db.close();
    });
}


function Print(obj) {
    console.log(obj);
}

// InsertList("devices", [{name:"test6", type:"test"},{name:"test7", type:"test"}], undefined);
// Find("devices", {}, Print);
// Remove("devices", {type:"test"}, undefined);
// Update("devices", {type: "test_no"}, {name: "test", type: "test"}, undefined);

exports.InsertList = InsertList;
exports.Find = Find;
exports.Update = Update;