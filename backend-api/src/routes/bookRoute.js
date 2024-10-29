// src/routes/bookRoute.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books/:category', bookController.getBooksByCategory);

module.exports = router;
