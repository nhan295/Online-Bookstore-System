<template>
     
    <UserPage_Header />
 
      <div class="title" style="padding-top: 60px;">
        
       <Book_List category="Romantic " />
      </div>
 
      <div class="title" style="padding-top: 30px;">
         
       <Book_List category="Adventure" />
      </div>
 
      <div class="title" style="padding-top: 30px;">
         
       <Book_List category="Economic" />
      </div>
     
 </template>

<script>
import UserPage_Header from '@/components/UserPage_Header.vue';
import Book_List from '@/components/Book_List.vue';
    export default {
        components: {
            UserPage_Header,
            Book_List
        }

    };
</script>

<style>
</style>