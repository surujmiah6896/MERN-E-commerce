const express = require('express');

const router = express.Router();


//first image upload
router.post("/add", addProduct);


module.exports = router;