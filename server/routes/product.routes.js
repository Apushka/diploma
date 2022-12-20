const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const { field, value } = req.query;
    let list;
    if (field === "title") {
      list = await Product.find({
        title: { $regex: value, $options: "i" },
      });
    } else {
      list = await Product.find({ [field]: value });
    }
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });

    res.status(200).send(product);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
