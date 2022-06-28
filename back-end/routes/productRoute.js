const express = require('express');
const { getAllProducts, createNewProduct, updateProduct, deleteProduct, getProductDetails} = require('../controllers/productController');

const router = express.Router();

//Create product ONLY ADMIN
router.route("/product/new").post(createNewProduct);


router.route("/products").get(getAllProducts);

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router;