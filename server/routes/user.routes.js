const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
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

module.exports = router;
