const express = require("express");
const categoryController = require("../../controllers/admin/categoryController");

const router = express.Router();

router.post("/add", categoryController.storeCategory);
router.get("/get", categoryController.getAllCategory);
router.put("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;