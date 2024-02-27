const { Router, application } = require("express");
const Ads = require("../models/Ads");
const multer = require("multer");
// path = require("path");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// var upload = multer({ storage: storage });
const upload = multer({ dest: "public/uploads/" });
const router = Router();

INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const CREATED = 201;
const OK = 200;

function checkObj(obj) {
  for (key in obj) {
    return false;
  }
  return true;
}

// /api/ads/add
router.post("/add", upload.array("files"), async (req, res) => {
  try {
    if (!req.body) {
      return res.status(BAD_REQUEST).json({ message: "invalid body....." });
    }
    const filename = new Array();
    for (let i = 0; i < req.files.length; i++) {
      filename.push(req.files[i].filename);
    }
    const options = new Object(req.body);
    console.log(options, "options /add");
    options.filename = filename;
    const ads = new Ads(options);
    const newAds = await ads.createAds();
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
// /api/ads/all
router.get("/all", async (req, res) => {
  const options = new Object();
  const ads = new Ads(options);
  const adds = await ads.all();
  console.log(adds, "adds запрос на все объявления");
  if (!checkObj(adds)) {
    return res.status(OK).json(adds);
  } else {
    return res.status(BAD_REQUEST).json({ message: "error get all" });
  }
});
// /api/ads/all/:id
router.get("/all/:id", async (req, res) => {
  try {
    const options = {
      id: req.params.id,
    };
    const ads = new Ads(options);
    const current = await ads.currentAds();
    if (current.length) {
      return res.status(OK).json(current);
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
//  /api/ads/myAds/:id
router.get("myAds/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "необходимо авторизироваться!" });
    }
    const options = {
      useId: req.params.id,
    };
    const ads = new Ads(options);
    const myAds = await ads.myAds();
    if (myAds.length) {
      return res.status(OK).json(myAds);
    } else {
      return res.status(BAD_REQUEST).json({ message: "ads doesnt exist...." });
    }
  } catch (error) {
    return (
      res.status(INTERNAL_SERVER_ERROR).json({ message: error.message }),
      console.log("error in MyAds request")
    );
  }
});
// /api/ads/myAds/update
router.post("myAds/update", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(BAD_REQUEST).json({ message: "There are no ads" });
    }
    const options = new Object(req.body);
    const ads = new Ads(options);
    const update = await ads.update();
    if (update == undefined) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "error updating the ads" });
    }
  } catch (error) {
    return (
      res.status(INTERNAL_SERVER_ERROR).json({ message: error.message }),
      console.log("error in uploads request")
    );
  }
});
module.exports = router;
