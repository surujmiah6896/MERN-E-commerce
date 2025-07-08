const express = require("express");
const { getFilteredProducts } = require("../../controllers/shop/productController");


const router = express.Router();

router.get("/get", getFilteredProducts);
// router.get("/get/:id", getProductDetails);

module.exports = router;