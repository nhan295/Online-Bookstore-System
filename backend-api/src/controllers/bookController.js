// src/controllers/bookController.js
const Book = require('../models/bookModel');

const getBooksByCategory = async (req, res) => {
  const { category } = req.params;
  const detail= await Book.getBooksByCategory(category)

  if(detail) {
    res.json({message: detail})
  }
};

// const searchBooksByName = async (req, res) => {
//   try {
//     const { name } = req.query; // Lấy tên sách từ query string
//     const books = await Book.searchByName(name); // Gọi hàm tìm kiếm từ model
//     res.json({ message: books }); // Trả về kết quả dưới dạng JSON
//   } catch (error) {
//     res.status(500).json({ message: 'Error searching books', error });
//   }
// };

module.exports = {
  getBooksByCategory
  // searchBooksByName
}