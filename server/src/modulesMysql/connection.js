const mysql = require("mysql2");
const config = require("config");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "db_marketAds",
  password: config.get("password"),
});

connection.connect(function (error) {
  if (error) {
    return console.error(`Ошибка: ${error.message}`);
  } else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

module.exports.query = (sql, params) => {
  return new Promise((resolve) => {
    connection.query(sql, params, (error, results) => {
      resolve(results);
    });
  });
};
