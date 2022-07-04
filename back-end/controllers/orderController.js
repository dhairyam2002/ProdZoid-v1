const Order = require("../models/orderModel");
const Product = require("../models/productModel");

//only by logged in users
exports.newOrder = async (req, res, next) =>{

    console.log(req.body)
    try {
        const {shippingDetails, orderItems , paymentInfo, orderValue, shippingPrice, totalPrice} = req.body

        const order = await Order.create({shippingDetails, orderItems , paymentInfo, orderValue, shippingPrice, totalPrice, paymentDate : Date.now(), user: req.user._id});

        res.status(200).json({
            success: true,
            message: "Order successfully placed"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}