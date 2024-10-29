c// src/models/bookModel.js
const db = require('../config/db');

const bookModel = {
  getBooksByCategory: (category, callback) => {
    const query = `SELECT * FROM books WHERE Sach_Ten = ?`;
    db.query(query, [category], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },
};

module.exports = bookModel;

