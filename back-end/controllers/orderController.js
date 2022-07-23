const Order = require("../models/orderModel");
const Product = require("../models/productModel");

//only by logged in users
exports.newOrder = async (req, res, next) =>{

    console.log(req.body)
    try {
        console.log("fhnakfn");
        const {shippingDetails, orderItems , orderValue, totalPrice} = req.body

        const order = await Order.create({shippingDetails, orderItems, orderValue, totalPrice, user: req.user._id});

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


exports.getOrdersByUser = async (req, res, next) => {
    try {
        const id = req.user._id;

        const orders = await Order.find({user: id});

        console.log(orders);
        if(!orders){
            res.status(400).json({
                success: false,
                message: "No orders made till yet!"
            })
        }
        else{
            res.status(200).json({
                success: true,
                orders
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}

