const express = require("express");
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");
const Order = require("../models/Order");
const Token = require("../models/Token");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({
        error: {
          message: "USER_NOT_FOUND",
          code: 404,
        },
      });
    }
    const userData = {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      tel: user.tel,
    };

    res.status(200).send(userData);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete(
  "/:userId",
  [check("password", "Пароль не может быть пустым").exists()],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }
      const { userId } = req.params;
      if (userId !== req.user._id) {
        res.status(401).json({
          message: "Unauthorized",
        });
      }
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(403).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 403,
          },
        });
      }
      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordEqual) {
        return res.status(403).send({
          error: {
            message: "INVALID_PASSWORD",
            code: 403,
          },
        });
      }
      await Order.deleteMany({ userId: existingUser._id });
      await Token.deleteOne({ user: existingUser._id });
      await User.deleteOne({ _id: existingUser._id });
      res.sendStatus(204);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  }
);

module.exports = router;
