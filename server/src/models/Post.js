//const db = require("../modulesMysql/connection");

class Post {
  constructor(options) {
    this.formData = options;
  }
  async createPost() {
    try {
      const files = JSON.stringify(this.formData.filename);
    } catch {}
  }
}
