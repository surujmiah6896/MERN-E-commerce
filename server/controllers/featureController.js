const { sendWithData, sendWithResponse } = require("../Helpers");
const Feature = require("../models/Feature");

const featureController = {};

featureController.addFeatureImage = async(req, res)=>{
   
  try {
    const uploadedFile =
      req.files && req.files.length > 0 ? req.files[0].filename : null;

    const featureImages = new Feature({
      image: uploadedFile,
    });
    const newfeature = await featureImages.save();
    return sendWithData(res, 201, true, newfeature, "Feature Add Successfully");
  } catch (e) {
    console.log(e);
    return sendWithResponse(res, 500, false, "Some error occured!");
  }
};

featureController.getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});
    return sendWithData(res, 200, true, images, "Feature get Successfully");
  } catch (e) {
    console.log(e);
    return sendWithResponse(res, 500, false, "Some error occured!");
  }
};


module.exports = featureController;