const { sendWithResponse } = require("../../Helpers");
const Product = require("../../models/Product");
const productController = {};

productController.addProduct = async(req, res) =>{
    try{
        const {
          image,
          title,
          description,
          category,
          brand,
          price,
          salePrice,
          totalStock,
          averageReview,
        } = req.body;

        const newProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview,
          });

          await newProduct.save();
          return sendWithResponse(res, 200, true, "Product Add Successful");
    }catch(err){
        return sendWithResponse(res, 500, false, "Some Error occured");
    }
}

module.exports = productController;