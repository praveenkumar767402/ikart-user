const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAddresses, addAddress, updateAddress, deleteAddress } = require('../controllers/addressController');

// All routes are protected
router.get('/', auth, getAddresses);
router.post('/', auth, addAddress);
router.put('/:id', auth, updateAddress);
router.delete('/:id', auth, deleteAddress);

module.exports = router;
