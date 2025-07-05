const authController = {};


authController.registerUser = async(req, res) => {
    const {userName, email, password} = req.body;

    try{
        const existUser = 

    }catch(e){
        console.log(e);
        res.status(500).json({
            status: false,
            message: "some error occured",
        });
    }
}