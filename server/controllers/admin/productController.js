const productController = {};

productController.add = async(req, res) =>{
    try{
        const {
        //   image,
          title,
          description,
          category,
          brand,
          price,
          salePrice,
          totalStock,
          averageReview,
        } = req.body;

        

    }catch(err){
        return sendWithResponse(res, 500, false, "Some Error occured");
    }
}

module.exports = productController;