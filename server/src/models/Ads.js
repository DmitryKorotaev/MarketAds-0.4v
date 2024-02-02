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
      const ads = this.options;
      return ads;
    } catch (error) {
      return new Object();
    }
  }

  async all() {
    try {
      const ads = await db.query(`SELECT * FROM ads`);

      for (let i = 0; i < ads.length; i++) {
        ads[i].image = JSON.parse(ads[i].image);
      }
      // ads = ads.map((ad) => {
      //   ad.image = JSON.parse(ad.image);
      return ads;
      // });
    } catch (error) {
      return false, console.log("error method all");
    }
  }
  async currentAds() {
    try {
      const ads = await db.query(
        `SELECT * FROM ads WHERE ID="${this.options.id}" `
      );
      ads[0].image = JSON.parse(ads[0].image);
      const user = await db.query(
        `SELECT email FROM  users WHERE ID= "${post[0].userId}"`
      );
      if (ads.length) {
        ads.push(user[0]);
      }
      return ads;
    } catch (error) {
      return new Array();
    }
  }
}
module.exports = Ads;
