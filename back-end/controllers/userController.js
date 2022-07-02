const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")
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

    const isPassword = await user.comparePassword(password);
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
      return res.status(500).json({message: "User not found"})
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n ${resetPasswordUrl}`
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return res.status(500).json( {message: error.message})
    }
        
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
    
  }


  exports.resetPassword = async function(req, res, next){
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt : Date.now()}
    })

    if(!user){
        return res.status(400).json({
            success: false,
            message: "Token expired"
        })
    }
    if(req.body.password !== req.body.confirmPassword){
        return res.status(400).json({
            message: "Passwords don't match"
        })
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save({validateBeforeSave: false})

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
  