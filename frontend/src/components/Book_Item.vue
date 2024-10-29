<template>
    <div class="list-item">
      <img :src="book.image" alt="Book Cover" class="book-cover" />
      <img src="`./assets/${book.SACH_Anh || 'default.jpg'}`" alt="">
      <span>{{book.Sach_Ten }}</span>
      <span>{{book.Sach_GiaBan}}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      book: Object,
    },
  };
  </script>
  
  <style scoped>

    .list {
        display: flex;
        justify-content: space-around;
    }

    .list-item {
        display: flex;
        height: 100%;
        /* margin: auto 0; */
        align-items: center;
        flex-direction: column;
        border: 1px solid rgb(119, 138, 150);
        border-radius: 4px;
        box-shadow: inset;
    }
    .list-item img {
        width: 40%;
    }
</style>

  