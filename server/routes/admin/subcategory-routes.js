const express = require("express");
const subcategoryController = require("../../controllers/admin/subcategoryController");

const router = express.Router();

router.post("/add", subcategoryController.storeSubcategory);
router.get("/get", subcategoryController.getAllSubcategory);
router.put("/update/:id", subcategoryController.updateSubcategory);
router.delete("/delete/:id", subcategoryController.deleteSubcategory);

module.exports = router;