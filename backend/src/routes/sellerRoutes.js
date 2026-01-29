const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const auth = require('../middleware/auth'); // Assuming you have an auth middleware

// All routes require authentication
// router.use(auth); 

router.get('/stats', sellerController.getSellerStats);
router.get('/products', sellerController.getSellerProducts);

module.exports = router;
