const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const authController = {};


authController.registerUser = async(req, res) => {
    const {userName, email, password} = req.body;

    try{
        const existUser = await User.findOne({$or: [{email}, {userName}]});
        if (existUser) {
            return res.status(400).json({status: false, message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password:hashPassword,
        });

        await newUser.save();
        res.status(200).json({
            status: true,
            message: "Register Successful",
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            status: false,
            message: "some error occured",
        });
    }
}


module.exports = authController;