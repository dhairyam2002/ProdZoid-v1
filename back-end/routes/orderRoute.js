const express = require("express");
const { newOrder, getOrdersByUser, getSingleOrder } = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/orders/user").get(isAuthenticatedUser, getOrdersByUser);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);



module.exports = router;