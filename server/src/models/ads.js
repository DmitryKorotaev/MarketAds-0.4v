const db = require("../modulesMysql/connection");

class Ads {
  constructor(options) {
    this.description = options.description;
    this.category = options.category;
    this.title = options.title;
    this.id = options.id;
  }

  async createAds() {
    try {
      const filename = req.files.map((file) => file.filename);
      const files = JSON.stringify(filename);
      const categories = await db.query(
        `SELECT * FROM category WHERE category="${category}"`
      );
      const categoryId = categories[0].id;
      await db.query(
        `INSERT INTO ads SET
      userId="${id}",
      title="${title}",
      description="${description}",
      categiry="${categoryId}",
      image=?`,
        [files]
      );
    } catch (error) {
      return console.log(` Что-то пошло не так при создании пользователя `);
    }
  }
}
module.exports = Ads;
