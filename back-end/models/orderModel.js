const mongoose = require("mongoose");


const orderSchema = mongoose.Schema({
    shippingDetails: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: { 
            type: String, 
            required: true 
        },
        country: { 
            type: String, 
            default: "India" 
        },
        pinCode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            minLength: 10,
            required: true
        }
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paymentDate: {
        type: Date,
        required: true
    },

    orderValue: {
        type: Number,
        default: 0,
        required: true
    },

    shippingPrice: {
        type: Number,
        default: 0,
        required: true
    },

    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    orderStatus: {
        type: String,
        default: "processing",
        required: true
    },
    deliveredAt:{
        type: Date
    },
    createAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Order", orderSchema)