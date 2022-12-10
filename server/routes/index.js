const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/category", require("./category.router"));
router.use("/tag", require("./tag.routes"));
router.use("/product", require("./product.routes"));
router.use("/user", require("./user.routes"));
router.use("/delivery", require("./delivery.routes"));
router.use("/order", require("./order.routes"));
router.use("/shop", require("./shop.routes"));

module.exports = router;
