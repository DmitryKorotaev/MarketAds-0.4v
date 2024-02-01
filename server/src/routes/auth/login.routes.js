const { Router } = require("express");
const User = require("../../models/User");
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
        return res.json({ message: error.array() });
      }

      const options = {
        email: req.body.email,
        password: req.body.password,
      };
      // console.log(options);

      const user = new User(options);
      // console.log(user);
      const newUserLog = await user.login();
      console.log(newUserLog, "newUserLog");

      if (!checkObj(newUserLog)) {
        res.status(ACCEPTED).json(newUserLog);
      } else {
        res.status(UNPROCESSABLE_ENTITY).json({ message: error.message });
      }
    } catch (e) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "Что-то пошло не так (login)" });
    }
  }
);

module.exports = router;
