const express = require("express");
const { newOrder } = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;