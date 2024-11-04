// src/controllers/bookController.js
const Book = require('../models/bookModel');

const getBooksByCategory = async (req, res) => {
  const { category } = req.params;
  const detail= await Book.getBooksByCategory(category)

  if(detail) {
    res.json({message: detail})
  }
};
module.exports = {
  getBooksByCategory
}