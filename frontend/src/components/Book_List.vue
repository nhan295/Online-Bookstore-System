<template>
  <div class="body">
    <h2>{{ category }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="list_container">
        <div v-for="(book, index) in books" :key="index" class="list-item">
            <img :src="book.book_image" alt="Book Cover" class="book-cover" />
            <span>{{ book.book_title }}</span>
            <span>{{ book.book_price }}</span>
            <span>{{ book.book_discount }}</span>
            <button>Thêm giỏ hàng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  category: String,
});

const books = ref([]);
const loading = ref(true);
const error = ref(null);

const formatNumber = (number) => {
  return new Intl.NumberFormat('vi-VN').format(number).concat(' đ')
}

const fetchBooks = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`http://localhost:3000/api/v1/book/${props.category}`);
    if (!response.ok) {
      throw new Error('Failed to load books');
    }
    const data = await response.json();
    const bookData = data.message

    const newBookData = bookData.map((book) => {
      const priceFormat = formatNumber(book.book_price)
      const discountFormat = formatNumber(book.book_discount)

      return {
        book_discount: discountFormat,
        book_image: book.book_image,
        book_price: priceFormat,
        book_title: book.book_title
      }
    })
    console.log(bookData);
    books.value = newBookData;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBooks);
watch(() => props.category, fetchBooks);

</script>

<style scoped>
.body{
  display: grid;
  justify-content: center;
}
.list_container {
  display: flex;
  gap: 30px; /* Allows wrapping if there are too many items to fit in one line */
  justify-content: center; /* Adds space between each item */
  font-size: 18px;
}

.list_container img {
  margin-top: 20px;
}

.list_container button  {
  padding: 5px;
  font-size: 15px;
  margin: 10px 0px 20px 0px;
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

</style>
