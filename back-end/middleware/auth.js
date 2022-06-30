const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticatedUser = async function (req, res, next) {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json(
                {
                    message: "Please login to access this page"
                });
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        //This decoded data has user id which is stored in our database
        req.user = await User.findById(decodedData.id);

        //Here user is not an inbuilt property 

        //What is the need of next here?

        /*If you see route in which we are using current function (isAuthenticatedUser),
        it has two functions passed. This means that we have the privilege to run two functions once user makes a get/post request to that specific path

        FINE
        Now that we ran this function, just consider why did we run it? For authentication, so that only admins can post products, so once authentication is done, we will land him/her to creating product page? So after first function is invoked and run, we need to call second function. That is possible via next

        If we don't invoke next, request response cycle will end.
        */
        next();
    } catch (error) {
        console.log("kadhnfk" + error);
    }

}