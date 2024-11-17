<template>
    <div class="list_container">
      <div v-for="(book, index) in listBooks" :key="index" class="list-item">
        <img :src="book.book_image" alt="Book Cover" class="book-cover" />
        <span>{{ book.book_title }}</span>
        <span class="bprice">{{ book.book_price }}</span>
        <span>{{ book.book_discount }}</span>
        <CartButton :book="book"/>
      </div>
    </div>
</template> 

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useEmitter } from '../emits';
import CartButton from '../components/CartButton.vue';

const listBooks = ref([]);
const { on } = useEmitter();

const formatNumber = (number) => {
  return new Intl.NumberFormat('vi-VN').format(number).concat(' đ')
}

const searchBooks = async (searchText) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/book/search/${searchText}`);
    if (response.data.books) {
      const list = response.data.books;


    const newBookData = list.map((book) => {
      const priceFormat = formatNumber(book.book_price)
      const discountFormat = formatNumber(book.book_discount)

      return {
        book_discount: discountFormat,
        book_image: book.book_image,
        book_price: priceFormat,
        book_title: book.book_title
      }
    })
    console.log(newBookData);
    listBooks.value = newBookData;
    }
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};
//lắng nghe sự kiện phát ra từ HomPage_Header và User_Page
on('search-query-updated', (searchQuery) => {
  if (searchQuery) {
    searchBooks(searchQuery);
  } else {
    listBooks.value = [];
  }
});

</script>

<style scoped>
.list_container {
  display: flex;
  gap: 12px; /* Allows wrapping if there are too many items to fit in one line */
  justify-content: center; /* Adds space between each item */
  padding-top: 90px;
}

.list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content; /* Adjust width as needed */
  text-align: center;
  border: 1px solid #ddd; /* Optional: adds a border around each item */
  border-radius: 8px; /* Optional: rounded corners */
  background-color: #f9f9f9; /* Optional: background color */
}

.list_container button {
    padding: 5px;
    font-size: 15px;
    margin: 10px 0px 20px 0px;
}

.book-cover {
  width: 100%; /* Makes the image width fill the container */
  height: auto;
  max-height: 200px; /* Optional: limits the height of the image */
  object-fit: cover;
  margin-bottom: 10px;
}

span {
  margin-top: 5px;
}

.list_container .bprice{
  text-decoration: line-through;
}
</style>