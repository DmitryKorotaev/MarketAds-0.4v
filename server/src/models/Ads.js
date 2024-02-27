const db = require("../modulesMysql/connection");

class Ads {
  constructor(options) {
    this.options = options;
  }
  async createAds() {
    try {
      const files = JSON.stringify(this.options.filename);
      const categories = await db.query(
        `SELECT * FROM category WHERE category="${this.options.category}"`
      );
      const categoryId = categories[0].ID;
      await db.query(
        `INSERT INTO ads SET 
        userId="${this.options.id}",
        title="${this.options.title}",
        description="${this.options.description}",
        image=?,
        category = "${categoryId}"`,
        [files]
      );
      const adds = this.options;
      console.log(adds, "adds созание объявления");
      return adds;
    } catch (error) {
      return new Object();
    }
  }

  async all() {
    try {
      const adds = await db.query(`SELECT * FROM ads`);

      for (let i = 0; i < adds.length; i++) {
        adds[i].image = JSON.parse(adds[i].image);
      }
      console.log(adds, "adds все объявления");
      return adds;
    } catch (error) {
      return false, console.log("error method all");
    }
  }
  async currentAds() {
    try {
      const adds = await db.query(
        `SELECT * FROM ads WHERE ID="${this.options.id}" `
      );
      adds[0].image = JSON.parse(adds[0].image);
      const user = await db.query(
        `SELECT email FROM  users WHERE id= "${adds[0].userId}"`
      );
      if (adds.length) {
        adds.push(user[0]);
      }
      return adds;
    } catch (error) {
      return new Array();
    }
  }
  async myAds() {
    try {
      const adds = await db.query(
        `SELECT * FROM ads WHERE userId = "${this.options.userId}"`
      );
      for (let i = 0; i < adds.length; i++) {
        adds[i].image = JSON.parse(adds[i].image);

        if (adds.length) {
          return adds;
        } else {
          return new Array();
        }
      }
    } catch (error) {
      return new Array();
    }
  }
  async deleteAds() {
    try {
      const res = await db.query(
        `DELETE FROM ads WHERE ID="${this.options.ID}"`
      );
      return res;
    } catch (error) {
      return new Object();
    }
  }
  async update() {
    try {
      const category = await db.query(
        `SELECT id FROM category WHERE category= "${this.options.category}"`
      );
      const files = JSON.stringify(this.options.filename);
      const adds = await db.query(`UPDATE ads SET 
          userId ="${this.options.userId}",
          title= "${this.options.title}",
          description = "${this.options.description}",
          category = "${category[0].ID}"
          image= ? WHERE ID = "${this.options.ID}", [files]`);
      return adds;
    } catch (error) {
      return new Array();
    }
  }
  async search() {
    try {
      const category = await db.query(
        `SELECT id FROM category WHERE category= "${this.options.selector}"`
      );
      const adds = await db.query(
        `SELECT * FROM ads WHERE category= "${category[0].ID}" AND
         (title LIKE "%${this.options.input}%" OR 
         description LIKE "%${this.options.input}%")`
      );
      for (let i = 0; i < adds.length; i++) {
        adds[i].image = JSON.parse(adds[i].image);
      }
      return adds;
    } catch (error) {
      return false;
    }
  }
}
module.exports = Ads;
