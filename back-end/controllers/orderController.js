const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");
//only by logged in users
exports.newOrder = async (req, res, next) => {

    console.log(req.body)
    try {
        const { shippingDetails, orderItems, orderValue, totalPrice } = req.body

        const order = await Order.create({ shippingDetails, orderItems, orderValue, totalPrice, user: req.user._id });

        res.status(200).json({
            success: true,
            message: "Order successfully placed"
        })
        let message = `Order is placed successfully! You can check the details here: ${req.protocol}://${req.get("host")}/myOrders/order/${order._id}`

        try {
            await sendEmail({
                email: req.user.email,
                subject: `Order Placed Successfully!`,
                message,
            });
        } catch (error) {
            console.log(error);
        }
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

        const orders = await Order.find({ user: id });

        if (!orders) {
            res.status(400).json({
                success: false,
                message: "No orders made till yet!"
            })
        }
        else {
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


exports.getAllOrders = async (req, res, next) => {
    try {
        let allOrders;
        if (req.query.status === "") {
            allOrders = await Order.find();
        }
        else {
            allOrders = await Order.find({ orderStatus: req.query.status });
        }

        if (!allOrders) {
            res.status(400).json({
                success: false,
                message: "No Orders found!"
            })
        }
        else {
            res.status(200).json({
                success: true,
                allOrders
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}
exports.getSingleOrder = async (req, res, next) => {
    try {
        const orderDetails = await Order.findById(req.params.id);

        if (!orderDetails) {
            res.status(400).json({
                success: false,
                message: "No such order found!"
            })
        }
        else {
            res.status(200).json({
                success: true,
                orderDetails
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const id = req.params.id;

        const orderDetails = await Order.findById(id);
        if (orderDetails.orderStatus === "delivered") {
            res.status(400).json({
                success: false,
                message: "Product is already delivered!"
            })
        }
        else {
            const order = await Order.findByIdAndUpdate(id, { orderStatus: "delivered" });

            const user = await User.findById(orderDetails.user);
            const items = orderDetails.orderItems;
            try {
                for (let i = 0; i < items.length; i++) {
                    const product = await Product.findById(items[i].product);
                    if (product) {
                        const updatedProduct = await Product.findByIdAndUpdate(items[i].product,
                            {
                                stock: Number(product.stock - items[i].quantity)
                            })
                        let message = `Order is delivered successfully! You can check the details here: ${req.protocol}://${req.get("host")}/myOrders/order/${order._id}`

                        try {
                            await sendEmail({
                                email: user.email,
                                subject: `Order Delivered Successfully!`,
                                message,
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            } catch (error) {
                console.log(error.message);
            }

            res.status(201).json({
                success: true,
                message: "Product delivered!!"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}


// exports.deleteAllOrders = async (req, res, next) => {
//     try {
//         const order = await Order.deleteMany({});
//         res.status(200).json({
//             success: true,
//             message: 'deleted'
//         })
//     } catch (error) {
//         res.json({
//             success: false,
//             error: error.message
//         })
//     }
// }