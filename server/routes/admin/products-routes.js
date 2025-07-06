const express = require('express');
const {
  addProduct,
  editProduct,
} = require("../../controllers/admin/productController");

const router = express.Router();


//first image upload
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);


module.exports = router;