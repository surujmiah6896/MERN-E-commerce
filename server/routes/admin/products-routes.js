const express = require('express');
const {addProduct} = require("../../controllers/admin/productController");

const router = express.Router();


//first image upload
router.post("/add", addProduct);


module.exports = router;