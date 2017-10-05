var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];
    arr.push(key + "=" + value);
  }

  return arr.toString();
}

var orm = {
	selectAll: function(tableInput, cb) {
		var qString = "SELECT * FROM " + tableInput + ";";
		connection.query(qString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
	insertOne: function(table, cols, vals, cb) {
		qString = "INSERT INTO " + table;
		
		qString += " (";
    qString += cols.toString();
    qString += ") ";
    qString += "VALUES (";
    qString += printQuestionMarks(vals.length);
    qString += ") ";

    console.log(qString);

    connection.query(qString, vals, function(err, result) {
    	if (err) {
    		throw err;
    	}
    	cb(result);
    });
	},
	updateOne: function(table, objColVals, condition, cb) {
		var qString = "UPDATE " + table;

		qString += " SET ";
    qString += objToSql(objColVals);
    qString += " WHERE ";
    qString += condition;

    console.log(qString);
    connection.query(qString, function(err, result) {
    	if (err) {
    		throw err;
    	}
    	cb(result);
    });
	}
};

module.exports = orm;