const { Router } = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const router = Router();

const CREATED = 201;
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

// /api/auth/register
router.post(
  "/register",
  [
    check("numberPhone")
      .isMobilePhone()
      .withMessage("Некорректный номер телефона"),

    check("name")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),

    check("email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password must contain at least 8 characters"),

    // // check("confirmPassword").custom((value, { req }) => {
    // //   if (value != req.body.password) {
    // //     console.log(req.body.password, req.body.confirmPassword);
    // //     throw new Error("confirm password does not match");
    // //   }
    //   return true;
    // }),
  ],

  async (req, res) => {
    try {
      if (!req.body) {
        res.status(BAD_REQUEST).json({ message: "invalid body.." });
      }

      const error = validationResult(req).formatWith(({ msg }) => msg);
      if (!error.isEmpty()) {
        return res.json({
          error: error.array(),
          message: "incorrect data during registration  :(",
        });
      }
      const options = {
        numberPhone: req.body.numberPhone,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      console.log(req.body);

      const user = new User(options);
      const newUserReg = await user.save();

      if (!checkObj(newUserReg)) {
        res.status(CREATED).json(newUserReg);
      } else {
        res.status(UNPROCESSABLE_ENTITY).json({ message: error.message });
      }
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
);

// /api/auth/login
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
