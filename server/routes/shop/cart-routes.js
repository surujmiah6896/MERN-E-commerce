const express = require('express');
const { addToCart } = require('../../controllers/shop/cartController');

const router = express.Router();

router.post("/add", addToCart);

module.exports = router;