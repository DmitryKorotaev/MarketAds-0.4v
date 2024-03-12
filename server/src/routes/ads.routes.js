const { Router, application } = require("express");
const Ads = require("../models/Ads");
const multer = require("multer");
path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

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
    //console.log(options, "options /add");
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
  //console.log(adds, "adds запрос на все объявления");
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
    console.log(ads, "ads, router/all/:id");
    const current = await ads.currentAds();
    console.log(current, "current  routes: all/:id");
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
router.get("/myAds/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "необходимо авторизироваться!" });
    }
    //console.log(req.params.id, "userId из req.params.id, routes ads");
    const options = {
      userId: req.params.id,
    };
    //console.log("myAds routes");
    const ads = new Ads(options);
    const myAds = await ads.myAds();
    //console.log(myAds, "myAds in ads routes");
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
router.post("/myAds/update", async (req, res) => {
  try {
    console.log(req.body, "req.body routes update");
    if (!req.body) {
      return res.status(BAD_REQUEST).json({ message: "There are no ads" });
    }
    const options = new Object(req.body);
    const ads = new Ads(options);
    const update = await ads.updateAds();
    if (update === undefined) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "error updating the ads!!" });
    } else {
      return res.status(OK).json(update);
    }
  } catch (error) {
    return (
      res.status(INTERNAL_SERVER_ERROR).json({ message: error.message }),
      console.log("error in uploads request")
    );
  }
});
// /api/ads/myAds/delete

router.post("/myAds/delete", async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "There is no such announcement" });
    }
    const options = new Object(req.body);
    const ads = new Ads(options);
    const del = ads.deleteAds();
    //console.log(del, "delete ads routes");
    if (del === undefined) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "There is no such announcement" });
    } else {
      return res.status(OK).json({ message: "ads has been deleted!" });
    }
  } catch (error) {
    return (
      res.status(INTERNAL_SERVER_ERROR).json({ message: error.message }),
      console.log("error in delete request")
    );
  }
});

// api/ads/search
router.post("/search", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(BAD_REQUEST).json({ message: "enter the data" });
    }
    const options = new Object(req.body);
    const ads = new Ads(options);
    const search = await ads.searchAds();
    return res.status(CREATED).json(search);
  } catch {
    return res.status(BAD_REQUEST).json({ message: error.message });
  }
});

module.exports = router;
