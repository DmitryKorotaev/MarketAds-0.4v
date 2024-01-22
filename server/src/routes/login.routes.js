const { Router } = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const router = Router();

const ACCEPTED = 202;
const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

function checkObj(obj) {
  if (Object.keys(obj).length === 0) {
    console.log("Введите корректные данные");
    return false;
  } else {
    return true;
  }
}

//api/auth/login
router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("такой email не подойдет")
      .normalizeEmail(),

    // check("numberPhone")
    //   .isMobilePhone()
    //   .exists()
    //   .withMessage("такой номер телефона не подойдет"),

    check("password").exists().withMessage("неверный пароль"),
  ],

  async (req, res) => {
    try {
      if (!req.body) {
        res.status(BAD_REQUEST).json({ message: "invalid body.." });
      }

      const errors = validationResult(req).formatWith(({ msg }) => msg);
      if (!errors.isEmpty()) {
        return res.status(UNPROCESSABLE_ENTITY).json({
          error: errors.array(),
          message: "incorrect data during registration  :(",
        });
      }

      const options = {
        email: req.body.email,
        password: req.body.password,
      };

      const user = new User(options);
      const newUserLog = user.login();
      if (!checkObj(newUserLog)) {
        res.status(ACCEPTED).json({ message: "successful login!!!" });
      } else checkObj(newUserLog);
      {
        res
          .status(UNPROCESSABLE_ENTITY)
          .json({ message: "invalid authorization data  :(" });
      }
    } catch (e) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "Что-то пошло не так (login)" });
    }
  }
);

module.exports = router;
