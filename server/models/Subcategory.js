const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);
subcategorySchema.statics.findByCategory = function(categoryId) {
    return this.find({ category: categoryId });
};

module.exports = mongoose.model('Subcategory', subcategorySchema);