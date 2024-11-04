<template>
  <div>
    <h2>{{ category }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="(book, index) in books" :key="index" class="list-item">
        <img :src="book.book_image" alt="Book Cover" class="book-cover" />
        <span>{{ book.book_title }}</span>
        <span>{{ book.book_price }}</span>
        <span>{{ book.book_discount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// Nhận `category` từ props
const props = defineProps({
  category: String,
});

// Tạo các biến reactive cho dữ liệu và trạng thái
const books = ref([]);
const loading = ref(true);
const error = ref(null);

// Hàm gọi API để lấy sách theo thể loại
const fetchBooks = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`http://localhost:3000/api/v1/book/${props.category}`);
    if (!response.ok) {
      throw new Error('Failed to load books');
    }
    const data = await response.json();
    books.value = data.message; // Lấy dữ liệu từ response
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Gọi hàm khi component được mount
onMounted(fetchBooks);

// Theo dõi sự thay đổi của `category` để cập nhật dữ liệu
watch(() => props.category, fetchBooks);
</script>

<style scoped>
.list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.book-cover {
  width: 150px;
  height: auto;
  margin-bottom: 10px;
}
</style>
