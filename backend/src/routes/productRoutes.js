const express = require('express');
const router = express.Router();
const { addProduct, getMyProducts, getAllProducts, deleteProduct, getProductById } = require('../controllers/productController');
const auth = require('../middleware/auth');

// Public Route
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected Routes (Seller)
router.post('/', auth, addProduct);
router.get('/my-products', auth, getMyProducts);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
