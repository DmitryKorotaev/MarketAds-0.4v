const { Router, application } = require("express");
const db = require("../../modulesMysql/connection");
const multer = require("multer");

path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

var upload = multer({ storage: storage });
const router = Router();

INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const CREATED = 201;
// /api/post/add
router.post("/add", upload.array("files"), async (req, res) => {
  try {
    if (!req.body) {
      return res.status(BAD_REQUEST).json({ message: "invalid body....." });
    }

    const { title, description, id, category } = req.body;
    console.log(req.body, "req.body");
    const filename = [];
    for (let i = 0; i < req.files.length; i++) {
      filename.push(req.files[i].filename);
    }
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
    category="${categoryId}",
    image=?`,
      [files]
    );

    res.status(CREATED).json({ message: "The ad has been created!!! (: " });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    console.log("Что-то пошло не так");
  }
});

router.post("/all", async (req, res) => {
  const ads = await db.query(`SELECTED * FROM ads`);
  ads = ads.map((ad) => {
    ad.image = JSON.parse(ad.image);
    return ad;
  });
  res.status(200).json({ ads: ads });
});
module.exports = router;
