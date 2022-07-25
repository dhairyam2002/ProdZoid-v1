const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");


exports.createNewProduct = async (req, res, next) => {
    try {

        const {name, price, category, stock, link1, link2, link3, description} = req.body;
        const obj = {
            name, price, category, stock, description,
            createdBy: req.user.id,
            images: [
                {
                    public_id: "not used",
                    url: link1
                },
                {
                    public_id: "not used",
                    url: link2
                },
                {
                    public_id: "not used",
                    url: link3
                }
            ]
        }
        console.log(obj);
        const product = await Product.create(obj);
        console.log(product);
        res.status(201).json({
            success: true
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

exports.getAllProducts = async (req, res) => {
    try {
        // console.log(req.query);
        const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter();
        const products = await apiFeatures.query;
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

//update product -- ONLY ADMIN

exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModifiy: false
        })
        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }
        await product.remove();
        res.status(200).json({
            success: true
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

exports.getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

exports.createProductReview = async (req, res, next) => {

    try {
        const { rating, comment, productId } = req.body;

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }


        const product = await Product.findById(productId);

        const allReviews = await Product.findById(productId).select("reviews");
        // console.log(allReviews);

        let isReviewed = false;
        let reviewObject = undefined;

        for await (let revObject of allReviews.reviews) {
            if (revObject.user.toString() === req.user._id.toString()) {
                isReviewed = true;
                reviewObject = revObject;
                break;
            }
        }
        if (isReviewed) {
            // console.log(isReviewed);
            product.reviews.forEach((rev) => {
                if (rev.user.toString() === req.user._id.toString()) {
                    rev.rating = rating,
                        rev.comment = comment
                }
            });
        }
        else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length
        }

        let sum = 0;
        product.reviews.forEach((rev) => {
            sum = sum + rev.rating;
        })

        product.ratings = sum / product.reviews.length
        await product.save({ validateBeforeSave: false });

        res.status(200).json({ success: true, message: "Review processed!" })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

exports.getAllReviews = async (req, res, next) => {
    try {
        const reviews = await Product.findById(req.body.productId).select("reviews");

        res.status(200).json({
            success: true,
            reviews
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.deleteReview = async (req, res, next) => {
    try {
        const product = await Product.findById(req.body.productId);
        // console.log(product.reviews);
        let review = undefined;
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                review = rev;
            }
        })
        product.numOfReviews = product.numOfReviews - 1;
        product.ratings = Number(((product.ratings * product.reviews.length) - review.rating) / product.numOfReviews);
        await review.remove();

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: "Delete successful"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}