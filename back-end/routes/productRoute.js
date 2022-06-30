const express = require('express');
const { getAllProducts, createNewProduct, updateProduct, deleteProduct, getProductDetails} = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

//Create product ONLY ADMIN
router.route("/products").get(isAuthenticatedUser, getAllProducts);


router.route("/product/new").post(createNewProduct);


router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router;