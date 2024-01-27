const { Router, application } = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const router = Router();

INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const CREATED = 201;

router.post("/add", upload.array("files"), async (req, res) => {
  try {
    if (!req.body) {
      return res.status(BAD_REQUEST).json({ message: "invalid body....." });
    }
    const { title, description, id, category } = req.body;
    const filename = req.files.map((file) => file.filename);
    const files = JSON.stringify(filename);
    const categories = await db.query(
      `SELECT * FROM category WHERE category="${category}"`
    );
    const categoryId = categories[0].id;
    const createAds = await db.query(
      `INSERT INTO ads SET 
    userId="${id}",
    title="${title}",
    description="${description}",
    categiry="${category}",
    image=?`,
      [files]
    );
    res.status(CREATED).json({ message: "The ad has been created!!! (: " });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

module.exports = router;
