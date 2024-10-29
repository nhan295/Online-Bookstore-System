// src/controllers/bookController.js
const Book = require('../models/bookModel');

exports.getBooksByCategory = (req, res) => {
  const { category } = req.params;
  Book.getBooksByCategory(category, (err, books) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(books);
  });
};
