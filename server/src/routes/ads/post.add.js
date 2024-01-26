const { Router, application } = require("express");
const db = require("../modules/connection");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = Router();
const BAD_REQUEST = 400;

router.post("/add", upload.array("files"), async (req, res) => {
  try {
    if (!req.body) {
      return res.status(BAD_REQUEST).json({ message: "invalid body....." });
    }
    const { title, description, id, category } = req.body;
    const filename = req.files.map((file) => file.filename);
    const files = JSON.stringify(filename);
  } catch (error) {}
});
