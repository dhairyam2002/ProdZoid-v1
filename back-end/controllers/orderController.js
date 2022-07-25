const Order = require("../models/orderModel");
const Product = require("../models/productModel");

//only by logged in users
exports.newOrder = async (req, res, next) => {

    console.log(req.body)
    try {
        console.log("fhnakfn");
        const { shippingDetails, orderItems, orderValue, totalPrice } = req.body

        const order = await Order.create({ shippingDetails, orderItems, orderValue, totalPrice, user: req.user._id });

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

        const orders = await Order.find({ user: id });

        console.log(orders);
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
        if (orderDetails.orderStatus === "Delivered") {
            res.status(400).json({
                success: false,
                message: "Product is already delivered!"
            })
        }
        else {
            const order = await Order.findByIdAndUpdate(id, { orderStatus: "delivered" });

            const items = orderDetails.orderItems;
            try {
                for (let i = 0; i < items.length; i++) {
                    const product = await Product.findById(items[i].product);
                    
                    if (product) {
                        const updatedProduct = await Product.findByIdAndUpdate(items[i].product, 
                            { 
                            stock: Number(product.stock - items[i].quantity) 
                        })
                        console.log(updatedProduct);
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