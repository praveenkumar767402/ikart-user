const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/', auth, placeOrder);
router.get('/my-orders', auth, getMyOrders);

module.exports = router;
