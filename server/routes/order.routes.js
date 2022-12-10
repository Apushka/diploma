const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const Order = require("../models/Order");

router.get("/:userId", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const list = await Order.find({ userId }).populate({
      path: "products.product",
      select: "title category",
    });
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newOrder = await Order.create({
      ...req.body,
    });
    res.status(201).send(newOrder);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
