const { sendWithResponse } = require("../../Helpers");
const Product = require("../../models/Product");
const productController = {};

//add product
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

//edit product
productController.editProduct = async(req, res) => {
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

        const id = req.params;
        const findProduct = Product.findById(id);
        if (!findProduct) {
          return sendWithResponse(res, 401, false, "Product not found");
        }

        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.salePrice =
          salePrice === "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;
        findProduct.averageReview = averageReview || findProduct.averageReview;

        await findProduct.save();
        return sendWithResponse(res, 200, true, "product update Successfully");

    }catch(err){
        return sendWithResponse(res, 500, false, "some server error");
    }
    
};

//delete a product
productController.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return sendWithResponse(res, 404, false, "Product not found");
    }

    return sendWithResponse(res, 200, true, "Product delete successfully");
  } catch (e) {
    console.log(e);
    return sendWithResponse(res, 500, false, "Some Error Occured");
  }
};

//get all product
productController.getAllProduct = async (req, res) => {
    try {
      const allProducts = await Product.find({});

      if (!allProducts) {
        return sendWithResponse(res, 401, false, "Empty product!");
      }
      return sendWithData(res, 200, true, allProducts, "product get successfully");
    } catch (e) {
      console.log(e);
      return sendWithResponse(res, 500, false, "Some Error Occured");
    }
}

module.exports = productController;