const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');

// Routes
router.post('/product', syncController.syncProduct);
router.delete('/product/:id', syncController.deleteProduct);
router.post('/seller', syncController.syncSeller);

module.exports = router;
