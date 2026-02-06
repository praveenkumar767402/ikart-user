const express = require('express');
const router = express.Router();
const creatorController = require('../controllers/creatorController');

router.get('/', creatorController.getAllCreators);
router.get('/:id', creatorController.getCreatorById);

module.exports = router;
