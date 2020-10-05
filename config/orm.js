const connection = require("./connection");

// HELPER FUNCTION for SQL SYNTAX

// The above helper function loops through and 
// creates an array of question marks - ["?", "?", "?"] - 
// and turns it into a string.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// OBJECT RELATIONAL MAPPER for all our SQL statement functions
const orm = {
  selectAll: function (tableInput, cb) {
    const queryString = "SELECT * FROM ?;"
    connection.query(queryString, tableInput, function (err, result) {
      if (err) throw err;

      cb(result);
    })
  },
  insertOne: function (table, cols, vals, cb) {
    let queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ");";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) throw err;

      cb(result);
    });
  },
  updateOne: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) throw err;

      cb(result);
    });
  },
}


// Export the ORM object in module.exports.

module.exports = orm;