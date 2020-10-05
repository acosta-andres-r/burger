const connection = require("./connection");

// OBJECT RELATIONAL MAPPER for all our SQL statement functions
const orm = {
  selectAll: function (tableInput, cb) {
    const queryString = "SELECT * FROM ?;"
    connection.query(queryString, tableInput, function (err, result) {
      if (err) throw err;

      cb(result);
    })
  },
}


// Export the ORM object in module.exports.

module.exports = orm;