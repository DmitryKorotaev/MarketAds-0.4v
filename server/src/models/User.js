const db = require("../modulesMysql/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const salt = 12;

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

      if (candidate.length) {
        return new Object();
      }
      //console.log(candidate);

      const hashedPassword = await bcrypt.hash(this.password, salt);
      //console.log(hashedPassword);

      // const isMatch = await bcrypt.compare(this.password, hashedPassword);
      //console.log(isMatch, "isMatch");

      await db.query(
        `INSERT INTO users SET 
        numberPhone="${this.numberPhone}",
        email="${this.email}",
        name="${this.name}",
        password="${hashedPassword}"`
      );
      return {
        numberPhone: this.numberPhone,
        email: this.email,
        name: this.name,
        password: hashedPassword,
      };
    } catch (error) {
      console.log(` Что-то пошло не так при создании пользователя `);
      return new Object();
    }
  }

  async login() {
    try {
      const candidate = await db.query(
        `SELECT * FROM users WHERE email ="${this.email}"`
      );
      //console.log(candidate);

      if (!candidate.length) {
        return new Object();
      }

      //console.log(this.password);
      const isMatch = await bcrypt.compare(
        this.password,
        candidate[0].password
      );

      //console.log(isMatch, "isMatch");

      if (!isMatch) {
        return new Object();
      }

      const token = jwt.sign(
        { userId: candidate[0].id, expiresIn: "1h" },
        config.get("jwtSecret")
      );
      //console.log(token);
      return { userId: candidate[0].id, token };
    } catch (error) {
      console.log(` Что-то пошло не так `);
      return new Object();
      // { message: error.message };
    }
  }
}
module.exports = User;
