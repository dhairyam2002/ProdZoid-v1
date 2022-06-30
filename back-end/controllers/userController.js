const User = require("../models/userModel");

//Register a user
exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name, email, password,
            avatar: {
                public_id: "Sample",
                url: "sam"
            }
        });
        const token = user.getJWTToken();
        const tokenObject = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };
        res.status(201).cookie("token", token, tokenObject).json({
            success: true,
            user,
            token
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}

//Logging in user

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please enter both Email and Password"

        })
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.json({
            message: "Invalid Email or Password"
        })
    }
    const isPassword = user.comparePassword(password);
    if (!isPassword) {
        return res.json({
            message: "Invalid Email or Password"
        })
    }
    const token = user.getJWTToken();
    const tokenObject = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.status(201).cookie("token", token, tokenObject).json({
        success: true,
        user,
        token
    })


}