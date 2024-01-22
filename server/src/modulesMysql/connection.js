const mysql = require("mysql2");
const config = require("config");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "db_marketAds",
  password: config.get("password"),
});

connection.connect(function (err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  } else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

module.exports.query = (sql, params) => {
  return new Promise((resolve) => {
    connection.query(sql, params, (err, results) => {
      resolve(results);
    });
  });
};
