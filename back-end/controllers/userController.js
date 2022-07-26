const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


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
            success: false,
            message: "Please enter both Email and Password"

        })
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.json({
            success: false,
            message: "Invalid Email or Password"
        })
    }

    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
        return res.json({
            success: false,
            message: "Invalid Email or Password"
        })
    }
    const token = user.getJWTToken();
    const tokenObject = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // for avoiding client side scripts to access data
    };
    res.status(201).cookie("token", token, tokenObject).json({
        success: true,
        user,
        token
    })


}


exports.logoutUser = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logged out succesfully"
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }

}

exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        // Get ResetPassword Token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;

        const message = `Your password reset token is :- \n ${resetPasswordUrl}`
        try {
            await sendEmail({
                email: user.email,
                subject: `Password Recovery`,
                message,
            });
            res.json({
                success: true,
                message: `Email sent to ${user.email} successfully`,
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return res.json({ message: error.message })
        }

    } catch (error) {
        return res.json({ message: error.message })
    }

}


exports.resetPassword = async function (req, res, next) {
    console.log(req.body.password);
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");


    console.log(resetPasswordToken);
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return res.json({
            success: false,
            message: "Token expired"
        })
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.json({
            message: "Passwords don't match!!"
        })
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save({ validateBeforeSave: false })

    // sending token
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


//This route can be accessed only via logged in user. If user is logged in, we can get his id via token and that will be stored in req.user
exports.getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updatePassword = async (req, res, next) => {


    try {
        const user = await User.findById(req.user.id).select('+password');
        console.log(req.body);
        const passwordMatched = await user.comparePassword(req.body.oldPassword);


  
        if (!passwordMatched) {
            return res.json({
                success: false
            })
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(404).json({ success: false, message: "Passwords don't match" });
        }

        user.password = req.body.newPassword;

        await user.save();

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
        res.status(500).json({ success: false, message: error.message })
    }
}


exports.updateProfile = async (req, res, next) => {
    try {
        const updatedData = {
            name: req.body.name,
            email: req.body.email
        }
        const authUser = await User.find({ email: req.body.email });
        let id = undefined;

        if(authUser.length != 0){
            id = authUser[0]._id.toString();
        }
        if (authUser.length == 0 || req.user._id.toString() == id) {
            let user = await User.findByIdAndUpdate(req.user.id, updatedData);
            user = await User.findById(req.user.id);
            res.status(200).json({
                success: true,
                message: "Successfully updated",
                user
            })
        }
        else{
            res.status(400).json({
                success: false,
                message: "Email already in use!",
            })
        }


    } catch (error) {
        res.json(500).json({
            success: false,
            message: error.message
        })
    }

}


// Get all users for admin
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get single user for admin
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not found!"
            })
        }
        res.status(200).json({
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

//Chaning the role (admin only)
exports.updateUserRole = async (req, res, next) => {
    try {
        const updatedData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }
        const user = await User.findByIdAndUpdate(req.params.id, updatedData);

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.deleteProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist!"
            })
        }

        await user.remove();

        res.status(200).json({ success: true, message: "User successfully removed!" });

    } catch (error) {
        res.status(500).json({ success: true, message: error.message })

    }
}
