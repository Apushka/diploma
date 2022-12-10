const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const Country = require("../models/Country");
const City = require("../models/City");

router.get("/", auth, async (req, res) => {
  try {
    const countries = await Country.find();
    const cities = await City.find();
    res.status(200).send({
      countries,
      cities,
    });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
