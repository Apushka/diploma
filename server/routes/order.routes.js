const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const Order = require("../models/Order");
const mailService = require("../services/mail.service");
const getSequenceId = require("../utils/getSequenceId");
// const mailService = require("../services/mail.service");

router.get("/:userId", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const list = await Order.find({ userId }).populate({
      path: "products.product",
      select: "title category price image",
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
    const _id = await getSequenceId();

    const newOrder = await Order.create({
      _id,
      ...req.body,
    });

    const newOrderPopulated = await newOrder.populate({
      path: "products.product",
    });

    const emailData = {
      to: req.body.email,
      total: req.body.total,
      name: req.body.name,
      _id,
    };

    await mailService.send(emailData);

    res.status(201).send(newOrderPopulated);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
