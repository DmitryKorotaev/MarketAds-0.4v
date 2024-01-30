const { Router, application } = require("express");
const db = require("../../modulesMysql/connection");
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
    const filename = [];
    for (let i = 0; i < req.files.length; i++) {
      filename.push(req.files[i].filename);
    }
    const files = JSON.stringify(filename);
    const categories = await db.query(
      `SELECT * FROM category WHERE category="${category}"`
    );
    console.log(req.body, "req.body");
    const categoryId = categories[0].id;
    const createAds = await db.query(
      `INSERT INTO ads SET 
    userId="${id}",
    title="${title}",
    description="${description}",
    category="${categoryId}",
    image=?`,
      [files]
    );
    console.log(createAds, "createAds");
    if (createAds) {
      res.status(CREATED).json({ message: "The ad has been created!!! (: " });
    }
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    console.log("Что-то пошло не так");
  }
});

module.exports = router;
