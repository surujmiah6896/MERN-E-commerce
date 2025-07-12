const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
categorySchema.statics.getSubcategoriesByCategory = async function (categoryId) {
    return await this.model("Subcategory").find({ category: categoryId, isActive: true });
};

module.exports = new mongoose.model("Category", categorySchema);