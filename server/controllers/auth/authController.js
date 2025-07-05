const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {sendWithError} = require('../../Helpers/index');



const authController = {};

//register user
authController.registerUser = async(req, res) => {
    const {userName, email, password} = req.body;

    try{
        const existUser = await User.findOne({$or: [{email}, {userName}]});
        if (existUser) {
            return sendWithError(res, 409, false, "User already exists");
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password:hashPassword,
        });

        await newUser.save();
        sendWithError(res, 200, true, "Register Successful");
    }catch(e){
        console.log("e",e);
        sendWithError(res, 500, false, "some error occured");
    }
}


//login user
authController.loginUser = async(req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        console.log("user",user);
        
        if(!user){
            return sendWithError(res, 409, false, "User doesn't exists! Please Register first");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return sendWithError(res, 401, false, "Incorrect password! please try again");
        }
        const token = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email,
            userName: user.userName,
        },"CLIENT_SECRET_KEY",{expiresIn: "60m"});

        res.cookie("token", token, {httpOnly: true, secure:false}).json({
            status: true,
            message: "Logged in Successfully",
            user:{
                email: user.email,
                role: user.role,
                id: user._id,
                userName: user.userName,
            },
        });
    }catch(e){
        console.log(e);
        res.status(500).json(sendWithError(true, 'Some error occured'));
    }
}


module.exports = authController;