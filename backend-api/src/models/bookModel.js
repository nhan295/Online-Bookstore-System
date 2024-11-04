const db = require('../config/db');

const bookModel = {
  getBooksByCategory: (category) => {
    return db('book').select('book.book_title','book.book_image','book.book_price','book.book_discount').innerJoin('book_types', 'book.type_id', 'book_types.type_id').where('book_types.type_name', `${category}`)
  },
};

// const bookSearch = {
//   searchBooksByName: (name) => {
//     return db('book')
//       .select('*')
//       .where('book_title', 'like', `%${name}%`); // Tìm kiếm sách theo tên có chứa chuỗi nhập vào
//   },
// };
module.exports = bookModel;
// module.exports = bookSearch;
