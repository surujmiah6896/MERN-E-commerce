const { sendWithData, sendWithResponse } = require("../../Helpers");
const Product = require("../../models/Product");

const productController = {};

productController.getFilteredProducts = async (req, res) => {
    try {
      const {
        categories = "",
        brands = "",
        minPrice = 0,
        maxPrice = 0,
        search = "",
        sortBy = "price-lowtohigh",
      } = req.query;
  
      let filters = {};
  
      if (categories.length) {
        filters.categoryId = { $in: categories.split(",") };
      }
  
      if (brands.length) {
        filters.brand = { $in: brands.split(",") };
      }

      if (search.trim().length > 0) {
        filters.title = { $regex: search.trim(), $options: "i" }; // Case-insensitive
      }

      filters.salePrice = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  
      let sort = {};
  
      switch (sortBy) {
        case "price-lowtohigh":
          sort.price = 1;
  
          break;
        case "price-hightolow":
          sort.price = -1;
  
          break;
        case "title-atoz":
          sort.title = 1;
  
          break;
  
        case "title-ztoa":
          sort.title = -1;
  
          break;
  
        default:
          sort.price = 1;
          break;
      }
  
      const products = await Product.find(filters).sort(sort);
  
      return sendWithData(res, 200, true, products, "get product successfully");
    } catch (e) {
      console.log(error);
      return sendWithResponse(res, 500, false, "Some error occured" );
    }
  };

productController.getProductWithCategoryId = async(req, res) =>{
  try{
    const { id } = req.params;
    const products = await Product.find({ categoryId: id }).populate("category");
    if(products.length <= 0){
      return sendWithResponse(res, 404, false, "Product not fount");
    }
    return sendWithData(res, 200, true, products, "Products fetched successfully");
  }catch(err){
    return sendWithResponse(res, 500, false, "Product get by CategoryId Error");
  }
}

module.exports = productController;