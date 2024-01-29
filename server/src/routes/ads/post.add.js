const { Router, application } = require("express");
const Ads = require("../../models/ads");
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
    const options = {
      title: req.body.title,
      description: req.body.description,
      id: req.body.id,
      category: req.body.category,
    };

    const ads = new Ads(options);
    const newAds = await ads.createAds();

    res.status(CREATED).json({ message: "New user has been created!!!" });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

module.exports = router;
