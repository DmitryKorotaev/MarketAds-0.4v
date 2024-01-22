const { Router } = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const router = Router();

const ACCEPTED = 202;
const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

// function checkObj(obj) {
//   if (obj === undefined || obj === null) {
//     console.log("Введите корректные данные!");
//     return true;
//   } else if (Object.keys(obj).length === 0) {
//     console.log("Введите корректные данные!");
//     return true;
//   } else {
//     return false;
//   }
// }

function checkObj(obj) {
  for (key in obj) {
    return false;
  }
  return true;
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

      const error = validationResult(req).formatWith(({ msg }) => msg);
      if (!error.isEmpty()) {
        return res.status(UNPROCESSABLE_ENTITY).json({
          error: error.array(),
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
      } else {
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
