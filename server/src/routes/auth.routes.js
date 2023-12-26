const { Router } = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validation");
const router = Router();

function checkObject(obj) {
  if (Object.keys(obj).length === 0) {
    console.log("объект пуст");
    return false;
  } else {
    return true;
  }
}

router.post(
  "/register",
  [
    check("phone").isMobilePhone().withMessage("Некорректный номер телефона"),

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

    /* check("confirmPassword")
        .custom((value, {req}) => {
          if(value != req.body.password) {
            console.log(req.body.password, req.body.confirmPassword)
            throw new Error ("confirm password does not match")
          }
          return true
        })*/
  ],

  async (req, res, next) => {
    const result = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !result.isEmpty();

    if (hasError) {
      res.status(422).json({ error: result.array() });
    } else {
      next();
    }
    try {
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так" });
    }
  }
);

module.exports = router;
