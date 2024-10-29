<template>
    <div class="book-list">
      <h2>{{ category.toUpperCase() }}</h2>
      <div class="books">
        <BookItem v-for="book in books" :key="book.id" :book="book" />
      </div>
    </div>
  </template>
  
  <script>
  import BookItem from './Book_Item.vue';
  
  export default {
    components: {
      BookItem,
    },
    props: {
      category: String,
    },
    data() {
      return {
        books: [],
      };
    },
    methods: {
      fetchBooks() {
        fetch(`http://localhost:3000/api/books/${this.category}`)
          .then(response => response.json())
          .then(data => {
            this.books = data;
          })
          .catch(error => console.error('Error fetching books:', error));
      },
    },
    mounted() {
      this.fetchBooks();
    },
  };
  </script>
  
  <style scoped>
  .book-list {
    margin: 20px 0;
  }
  
  .books {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  </style>
  