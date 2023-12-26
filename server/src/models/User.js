const db = require("../modulesMysql/connection");
const bcrypt = require("bcrypt");

class User {
  constructor(options) {
    this.numberPhone = options.numberPhone;
    this.name = options.name;
    this.email = options.email;
    this.password = options.password;
    this.passwordConfirm = options.passwordConfirm;
  }

  async save() {
    try {
      const candidate = await User.findOne({
        numberPhone: this.numberPhone,
        email: this.email,
      });
      /*const candidate = await db.query(
      `SELECT * FROM users WHERE
      numberPhone = '${this.numberPhone}' OR
       email = '${this.email}'`
       );*/
      if (candidate) {
        return new Object();
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        `INSERT INTO users SET numberPhone= '${this.numberPhone}', 
        name = "${this.name}", 
        email = "${this.email}", 
        password = "${hashedPassword}"`
      );
      return {
        numberPhone: this.numberPhone,
        name: this.name,
        email: this.email,
        password: hashedPassword,
      };
    } catch (error) {
      console.log(` Что-то пошло не так `);
      return { message: error.message };
    }
  }
}
module.exports = model("User");
