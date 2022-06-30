const User = require("../models/userModel");


//Register a user
exports.registerUser = async (req, res, next)=>{
    const {name, email, password}= req.body;
    try {
        const user = await User.create({
            name, email, password, 
            avatar: {
                public_id: "Sample",
                url: "sam"
            } });
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
        
    
}