const { sendWithResponse, sendWithData } = require("../../Helpers");
const Category = require("../../models/Category");

const categoryController = {};

categoryController.storeCategory = async (req, res) =>{
    try {
           const { name } = req.body;
           if(!name){
            return sendWithResponse(res, 400, false, "Name is required");
           }

           const existingCategory = await Category.findOne({ name });
           if (existingCategory) {
               return sendWithResponse(res, 409, false, "Category already exists");
           }

            const newCategory = new Category({name});
            const saveCategory = await newCategory.save();

           if (!saveCategory) {
               return sendWithResponse(res, 500, false, "Failed to save category");
           }
           return sendWithData(res, 201, true, saveCategory, "Create successfully!");
    } catch (error) {
        
    }
}

categoryController.getAllCategory = async (req, res) =>{
    try {
        const categories = await Category.find({});
        if (!categories || categories.length === 0) {
            return sendWithResponse(res, 404, false, "No categories found");
        }
        return sendWithData(res, 200, true, categories, "Categories fetched successfully!");
    } catch (error) {
        return sendWithResponse(res, 500, false, "Failed to fetch categories");
    }
}


module.exports = categoryController;