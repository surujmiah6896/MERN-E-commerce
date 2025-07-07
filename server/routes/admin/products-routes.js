const express = require('express');
const {
  addProduct,
  editProduct,
  deleteProduct,
  getAllProduct,
} = require("../../controllers/admin/productController");
const avatarUpload = require("../../Middleware/avatarCheckMiddleware");

const router = express.Router();


//first image upload
router.post("/add", avatarUpload, addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/all", getAllProduct)


module.exports = router;