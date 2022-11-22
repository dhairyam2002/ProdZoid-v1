const express = require('express');
const { getAllProducts, createNewProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview, getAllReviews, getProductByCategories} = require('../controllers/productController');


const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

const router = express.Router();

//Create product ONLY ADMIN
router.route("/products").get(getAllProducts);


router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRole("admin"),createNewProduct);


router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRole("admin"), updateProduct).delete(isAuthenticatedUser,authorizeRole("admin"),deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/product/review").put(isAuthenticatedUser,createProductReview).delete(isAuthenticatedUser, deleteReview).post(getAllReviews);

router.route('/product/categories/search').post(getProductByCategories);

module.exports = router;