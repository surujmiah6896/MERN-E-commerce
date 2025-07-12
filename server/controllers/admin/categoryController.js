const { sendWithResponse } = require("../../Helpers");

const categoryController = {};

categoryController.storeCategory = async (req, res) =>{
    const {name} = req.body;

    return res.status(200).send(name);
}


module.exports = categoryController;