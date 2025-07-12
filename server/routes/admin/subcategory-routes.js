const express = require("express");
const subcategoryController = require("../../controllers/admin/subcategoryController");

const router = express.Router();

router.post("/add", subcategoryController.storeCategory);
router.get("/get", subcategoryController.getAllCategory);
router.put("/update/:id", subcategoryController.updateCategory);
router.delete("/delete/:id", subcategoryController.deleteCategory);

module.exports = router;