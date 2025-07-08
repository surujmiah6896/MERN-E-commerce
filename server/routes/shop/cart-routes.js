const express = require('express');

const router = express.Router();

router.post("/add", addToCart);

module.exports = router;