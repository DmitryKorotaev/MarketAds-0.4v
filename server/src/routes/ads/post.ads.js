const { Router, application } = require("express");
const Ads = require("../../models/Ads");
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

function checkObj(obj) {
  for (key in obj) {
    return false;
  }
  return true;
}

// /api/post/add
router.post("/add", upload.array("files"), async (req, res) => {
  try {
    if (!req.body) {
      return res.status(BAD_REQUEST).json({ message: "invalid body....." });
    }
    const filename = [];
    for (let i = 0; i < req.files.length; i++) {
      filename.push(req.files[i].filename);
    }
    const options = new Object(req.body);
    options.filename = filename;
    ads = new Ads(options);
    newAds = await ads.createAds();
    if (!checkObj(newAds)) {
      return res.status(CREATED).json(newAds);
    } else {
      return res.status(BAD_REQUEST);
    }
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    console.log("Что-то пошло не так");
  }
});
// /api/post/all
router.get("/all", async (req, res) => {
  const options = new Object(req.body);
  ads = new Ads(options);
  allAds = await ads.all();
  console.log(allAds, "allAds");
  if (allAds) {
    return res.status(200).json(allAds);
  } else {
    return res.status(BAD_REQUEST).json({ message: "error get all" });
  }
});
// /api/post/all/:id
router.get("/all/:id", async (req, res) => {
  try {
    const options = {
      id: req.params.id,
    };
    const ads = new Ads(options);
    const current = await ads.currentAds();
    if (current.length) {
      return res.status(200).json(current);
    } else {
      return res.status(BAD_REQUEST).json({ message: "ads doesnt exist...." });
    }
  } catch (error) {
    return (
      res.status(INTERNAL_SERVER_ERROR).json({ message: error.message }),
      console.log("ошибка в запросе all/:id")
    );
  }
});
module.exports = router;
