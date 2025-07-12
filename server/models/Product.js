const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: String,
    brand: String,
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    totalStock: Number,
    averageReview: Number,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
  },
  { timestamps: true }
);

//Add Indexes (recommended for filtering/sorting)
ProductSchema.index({ categoryId: 1 });
ProductSchema.index({ subcategoryId: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ salePrice: 1 });

// Add virtuals for category/subcategory population
//
ProductSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

ProductSchema.virtual("subcategory", {
  ref: "Subcategory",
  localField: "subcategoryId",
  foreignField: "_id",
  justOne: true,
});

// Ensure virtuals are included in JSON & object responses
ProductSchema.set("toObject", { virtuals: true });
ProductSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", ProductSchema);