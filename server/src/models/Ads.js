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
        category="${categoryId}",
        image=?`,
        [files]
      );
      const adds = this.options;
      console.log(adds, "adds");
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
      // ads = ads.map((ad) => {
      //   ad.image = JSON.parse(ad.image);
      console.log(adds, "adds");
      return adds;
      // });
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
        `SELECT email FROM  users WHERE ID= "${adds[0].userId}"`
      );
      if (adds.length) {
        adds.push(user[0]);
      }
      return adds;
    } catch (error) {
      return new Array();
    }
  }
}
module.exports = Ads;
