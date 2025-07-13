const express = require("express");
const {
  getFilteredProducts,
  getProductWithCategoryId,
} = require("../../controllers/shop/productController");


const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/category/:id", getProductWithCategoryId);
// router.get("/get/:id", getProductDetails);

module.exports = router;