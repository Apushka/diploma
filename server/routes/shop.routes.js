const express = require("express");
const router = express.Router({ mergeParams: true });
const Shop = require("../models/Shop");

router.get("/", async (req, res) => {
  try {
    const list = await Shop.find().populate("country").populate("city");
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
