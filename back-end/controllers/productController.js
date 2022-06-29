const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");


exports.createNewProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
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