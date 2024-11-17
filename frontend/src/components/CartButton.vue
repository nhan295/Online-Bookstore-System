<template>
  <button class="btn btn-primary" @click="addItemToCart(book)">Add to Cart</button>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import CartStore from '../stores/CartStore.js';

const props = defineProps({
  cartItems: Array,
  book: {
    type: Object,
    required: true,
    validator: (book) => {
      const price = parseFloat(book.book_price);
      return !isNaN(price) && price > 0;
    }
  }
});

// Add to cart function
function addItemToCart(book) {
  const normalizedBook = {
    ...props.book,
    book_price: parseFloat(props.book.book_price)
  };
  CartStore.addToCart(normalizedBook);
}

// Computed property for the button text
const buttonText = computed(() => {
  // Check if the book is already in the cart
  const existingItem = CartStore.cartItems.find(item => item.book_id === props.book.book_id);
  return existingItem ? 'Added to Cart' : 'Add to Cart';
});
</script>
