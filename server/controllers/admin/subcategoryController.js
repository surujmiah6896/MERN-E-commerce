const { sendWithData, sendWithResponse } = require("../../Helpers");
const Product = require("../../models/Product");
const Subcategory = require("../../models/subcategory");

const subcategoryController = {};

subcategoryController.storeSubcategory = async (req, res) => {
  const { name, categoryId } = req.body;

  // Simple validation
  if (!name || !categoryId) {
    return sendWithResponse(
      res,
      400,
      false,
      "Name and categoryId are required."
    );
  }

  try {
    const subcategory = new Subcategory({ name, category: categoryId });
    const saveSubcategory = await subcategory.save();
    return sendWithData(
      res,
      200,
      true,
      saveSubcategory,
      "Subcategory added successfully!"
    );
  } catch (error) {
    return sendWithResponse(res, 500, false, "Failed to create subcategory.");
  }
};

subcategoryController.getAllSubcategory = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('category');
        if (subcategories.length === 0) {
            return sendWithResponse(res, 404, false, "No subcategories found.");
        }
        return sendWithData(
            res,
            200,
            true,
            subcategories,
            "Subcategories fetched successfully!"
        );
    } catch (error) {
        return sendWithResponse(res, 500, false, "Failed to fetch subcategories.");
    }
};

subcategoryController.updateSubcategory = async (req, res) => {
    const { id } = req.params;
    const { name, categoryId } = req.body;

    // Check if subcategory exists
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) {
        return sendWithResponse(res, 404, false, "Subcategory not found.");
    }

    // Update fields if provided
    if (name) subcategory.name = name;
    if (categoryId) subcategory.category = categoryId;
    if (typeof req.body.isActive !== "undefined") subcategory.isActive = req.body.isActive;

    try {
        const updatedSubcategory = await subcategory.save();
        return sendWithData(
            res,
            200,
            true,
            updatedSubcategory,
            "Subcategory updated successfully!"
        );
    } catch (error) {
        return sendWithResponse(res, 500, false, "Failed to update subcategory.");
    }
};

subcategoryController.deleteSubcategory = async (req, res) => {
    const { id } = req.params;

    // Check if subcategory exists
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) {
        return sendWithResponse(res, 404, false, "Subcategory not found.");
    }

    // Check if any product exists with this subcategory
    const hasProducts = await Product.exists({ subcategory: id });

    if (hasProducts) {
        return sendWithResponse(res, 400, false, "Cannot delete: Products exist under this subcategory.");
    }

    try {
        await Subcategory.findByIdAndDelete(id);
        return sendWithResponse(res, 200, true, "Subcategory deleted successfully!");
    } catch (error) {
        return sendWithResponse(res, 500, false, "Failed to delete subcategory.");
    }
};

module.exports = subcategoryController;
