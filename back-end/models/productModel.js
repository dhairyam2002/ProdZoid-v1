const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please enter product name"]
    },
    description:{
        type: String,
        required:[true, "Please enter description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength : [8, "Price cannot exceed 8 characters"]
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [{
        public_id :  {
            type: String,
            required: true
        },
        url: {
            type: String, 
            required: true
        }
    }],
    category : {
        type: String,
        required: [true, "Please enter category"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    // reviews: [
    //     {
    //         name: {
    //             type: String,
    //             required: true,
    //         },
    //         rating: {
    //             type: Number,
    //             required: true,
    //         },
    //         comment: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})
//This exports the collection
//This is analogous to table in sql database
//and documents will be entries

module.exports = mongoose.model("Product", productSchema);