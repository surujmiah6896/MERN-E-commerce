const express = require('express');
const { addFeatureImage, getFeatureImages } = require('../controllers/featureController');
const featureUpload = require("../Middleware/featureCheckMiddleware");
const router = express.Router();

router.post("/add",featureUpload, addFeatureImage);
router.get("/get", getFeatureImages);

module.exports = router;