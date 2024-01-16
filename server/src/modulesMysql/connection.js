const mysql = require("mysql2");
const config = require("config");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "db_marketAds",
  password: config.get("password"),
});

module.exports.query = (sql, params) => {
  return new Promise((resolve) => {
    connection.query(sql, params, function (err, results) {
      resolve(results);
    });
  });
};
