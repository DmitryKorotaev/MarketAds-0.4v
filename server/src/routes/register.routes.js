const { Router } = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validation");
const router = Router();

const CREATED = 201;
const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

function checkObj(obj) {
  if (Object.keys(obj).length === 0) {
    console.log("Введите корректные данные!");
    return false;
  } else {
    return true;
  }
}
// api/auth/register
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

    check("confirmPassword").custom((value, { req }) => {
      if (value != req.body.password) {
        console.log(req.body.password, req.body.confirmPassword);
        throw new Error("confirm password does not match");
      }
      return true;
    }),
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
        numberPhone: req.body.numberPhone,
        name: req.body.name,
        email: req.body.email,
        pasword: req.body.password,
      };

      const userRer = new User(options);
      const newUserReg = await user.save();

      if (!checkObj(newUserReg)) {
        res.status(CREATED).json({ message: "New user has been created!!!" });
      } else checkObj(newUserReg);
      {
        res
          .status(UNPROCESSABLE_ENTITY)
          .json({ message: "incorrect data during registration  :(" });
      }
    } catch (e) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "Что-то пошло не так" });
    }
  }
);

module.exports = router;
