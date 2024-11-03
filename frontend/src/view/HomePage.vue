<template>
     
   <HomePage_Header />

     <div class="title" style="padding-top: 60px;">
       
      <!-- <Book_List category="Romantic " /> -->
     </div>

     <div class="title" style="padding-top: 30px;">
        
      <!-- <Book_List category="Adventure" /> -->
     </div>

     <div class="title" style="padding-top: 30px;">
        
      <!-- <Book_List category="Economic" /> -->
     </div>
    
</template>

<script>
import HomePage_Header from '@/components/HomePage_Header.vue';
// // import ListBook from '@/components/ListBook.vue';
// import Book_List from '.@/components/Book_List.vue';
    export default {
        components: {
            HomePage_Header
            // ListBook,
            // Book_List
        }

    };
</script>