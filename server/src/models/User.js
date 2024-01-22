const db = require("../modulesMysql/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const salt = 10;

class User {
  constructor(options) {
    this.numberPhone = options.numberPhone;
    this.name = options.name;
    this.email = options.email;
    this.password = options.password;
    //this.passwordConfirm = options.passwordConfirm;
  }

  async save() {
    try {
      const candidate = await db.query(
        `SELECT * FROM users WHERE
      numberPhone = '${this.numberPhone}' OR
       email = '${this.email}'`
      );
      if (candidate) {
        return new Object();
      }
      const hashedPassword = await bcrypt.hash(this.password, salt);
      await db.query(
        `INSERT INTO users SET numberPhone= '${this.numberPhone}', 
        name = "${this.name}", 
        email = "${this.email}", 
        password = "${hashedPassword}"`
      ),
        (error, results) => {
          if (results) {
            return {
              numberPhone: this.numberPhone,
              name: this.name,
              email: this.email,
              password: hashedPassword,
            };
          } else {
            console.log(error, {
              message: "данные не были добавленны в базу данных",
            });
          }
        };
    } catch (error) {
      console.log(` Что-то пошло не так при создании пользователя `);
      return { message: error.message };
    }
  }

  async login() {
    try {
      const candidate = await db.query(
        `SELECT * FROM users WHERE
      numberPhone = '${this.numberPhone}'`
      );
      if (!candidate) {
        return new Object();
      }

      const isMatch = await bcrypt.compare(this.password, hashedPassword);

      if (!isMatch) {
        return new Object();
      }

      if (candidate) {
        const token = jwt.sign(
          { userId: candidate[0].ID, expiresIn: "1h" },
          config.get("jwtSecret")
        );
        return { userId: candidate[0].ID, token };
      } else {
        return console.log("token error");
      }
    } catch (error) {
      console.log(` Что-то пошло не так `);
      return { message: error.message };
    }
  }
}
module.exports = User;
