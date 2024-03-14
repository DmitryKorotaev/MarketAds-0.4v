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
      const categoryId = categories[0].id;
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
      //console.log(adds, "adds созание объявления");
      return adds;
    } catch (error) {
      return new Object();
    }
  }

  async all() {
    try {
      const adds = await db.query(`SELECT * FROM ads`);
      console.log(adds);
      // for (let i = 0; i < adds.length; i++) {
      //   adds[i].image = JSON.parse(adds[i].image);
      // }
      for (let i = 0; i < adds.length; i++) {
        try {
          if (typeof adds[i].image === "string") {
            adds[i].image = JSON.parse(adds[i].image);
          }
        } catch (error) {
          console.log("Error parsing JSON in row", i, error);
          adds[i].image = {};
        }
      }
      console.log(adds, "adds models все объявления");

      return adds;
    } catch (error) {
      console.log("error method all", error);
      return { error: "error fetching ads" };
    }
  }

  async currentAds() {
    try {
      const adds = await db.query(
        `SELECT * FROM ads WHERE ID="${this.options.id}" `
      );
      adds[0].image = JSON.parse(adds[0].image);
      const user = await db.query(
        `SELECT numberPhone, name FROM  users WHERE id= "${adds[0].userId}"`
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
      // for (let i = 0; i < adds.length; i++) {
      //   if (typeof adds[i].image === "string") {
      //     adds[i].image = JSON.parse(adds[i].image);
      //   }
      // }
      for (let i = 0; i < adds.length; i++) {
        try {
          if (typeof adds[i].image === "string") {
            adds[i].image = JSON.parse(adds[i].image);
          }
        } catch (error) {
          console.log("Error parsing JSON in row", i, error);
          adds[i].image = {};
        }
      }

      if (adds.length) {
        //console.log(adds, "adds все мои объявления из models Ads.js");
        return adds;
      } else {
        return new Array();
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
      //console.log(res, "delete myads model ads");
      return res;
    } catch (error) {
      return new Object();
    }
  }
  async updateAds() {
    try {
      const category = await db.query(
        `SELECT id FROM category WHERE category= "${this.options.category}"`
      );
      // const categoryId = category[0].id;
      const files = JSON.stringify(this.options.image);
      const adds = await db.query(
        `UPDATE ads SET 
          userId ="${this.options.userId}",
          title= "${this.options.title}",
          description = "${this.options.description}",
          category = "${category[0].id}",
          image= ? WHERE ID = "${this.options.ID}" `,
        [files]
      );
      const updatedAd = await db.query(
        `SELECT * FROM ads WHERE ID = "${this.options.ID}"`
      );
      console.log(files, "files models update");
      console.log(updatedAd, "adds models update");
      return updatedAd;
    } catch (error) {
      return new Array();
    }
  }
  async searchAds() {
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
