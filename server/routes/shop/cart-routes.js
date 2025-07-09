const express = require('express');
const {
  addToCart,
  fetchCartItems,
} = require("../../controllers/shop/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);

module.exports = router;