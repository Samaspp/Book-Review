const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.addBook); // Admin-only in final version

module.exports = router;
