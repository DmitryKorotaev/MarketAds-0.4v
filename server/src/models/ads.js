const db = require("../modulesMysql/connection");

class Ads {
  constructor(options) {
    this.description = options.description;
    this.category = options.category;
    this.title = options.title;
    this.id = options.id;
    this.files = options.files;
  }

  async createAds() {
    try {
      const filename = [];
      for (let i = 0; i < this.files.length; i++) {
        filename.push(this.files[i].filename);
      }
      const files = JSON.stringify(filename);
      const categories = await db.query(
        `SELECT * FROM category WHERE category="${this.category}"`
      );
      const categoryId = categories[0].id;
      await db.query(
        `INSERT INTO ads SET
      userId="${this.id}",
      title="${this.title}",
      description="${this.description}",
      categiry="${categoryId}",
      image=?`,
        [files]
      );
    } catch (error) {
      return console.log(
        error,
        `Что-то пошло не так при создании объявления ): `
      );
    }
  }
}
module.exports = Ads;
