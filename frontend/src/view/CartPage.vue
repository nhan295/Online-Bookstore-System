<template>
    <UserPage_Header />
  <div class="container mt-5 main-content">
    <h2 class="text-center mb-4">Your Shopping Cart</h2>
    <div v-if="cartItems.length === 0" class="text-center">
        <img src="D:\ct313h01-project-nhan295\frontend\src\assets\image\empty-cart.png" alt="Empty Cart" class="img-fluid mb-3" style="max-width: 150px;">
        <p>Your cart is empty!</p>
    </div>
    <div v-else class="table-responsive">
      <table class="table table-hover table-bordered text-center">
        <thead class="table-light">
            <tr>
            <th>Book Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in cartItems" 
              :key="item.book_id" 
              :class="{ 'table-active': activeRow === index }"
              @mouseover="activeRow = index"
              @mouseleave="activeRow = null">
                <td><img :src="item.book_image" alt="Book Image" class="img-thumbnail" style="width:60px; height: 80px;"></td>
                <td>{{ item.book_title }}</td>
                <td>{{ formatPrice(item.book_price) }}</td>
                <td>{{ formatPrice(item.book_discount) }}</td>
                <td>
                    <input 
                        type="number" 
                        v-model="item.quantity" 
                        class="form-control text-center"
                        @change="updateItemQuantity(item.book_id, item.quantity)" 
                        min="1">
                </td>
                <td>{{ formatPrice(item.book_price * item.quantity) }}</td>
                <td>
                    <button class="btn btn-danger btn-sm" data-bs-toggle="tooltip" title="Remove this item"  @click="removeItem(item.book_id)">
                        Remove
                    </button>
                </td>
            </tr>
        </tbody>
      </table>

      <div class="d-flex justify-content-between align-items-center">
        <h4 class="text-success">Total price after discount: {{ formatPrice(totalPrice) }}</h4>
        <button class="btn btn-success" @click="proceedToCheckout">Checkout</button>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-3">
        <button class="btn btn-danger" @click="clearAllItems">Clear Cart</button>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-3">
      <button class="btn btn-outline-primary" @click="navigateToBooks">Continue Shopping</button>
    </div>
  </div>
</template>

<script setup>
import UserPage_Header from '@/components/UserPage_Header.vue';
import router from '../router';
import * as bootstrap from 'bootstrap';
import { computed, onMounted, ref } from 'vue';
import CartStore from '../stores/CartStore.js';
import { Tooltip, Popover } from 'bootstrap';
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new Tooltip(el));

const activeRow = ref(null);

// Reactive cart items
const cartItems = CartStore.cartItems;

// Total price calculation
const totalPrice = computed(() =>
  CartStore.cartItems.reduce((total, item) => {
    const discount = parseInt(item.book_discount) || 0;
    return total + (discount > 0 ? discount : item.book_price) * item.quantity;
  }, 0)
);

// Update quantity of an item
function updateItemQuantity(bookId, newQuantity) {
  CartStore.updateQuantity(bookId, newQuantity);
}

// Remove item from cart
function removeItem(bookId) {
  CartStore.removeFromCart(bookId);
}

//Checkout
function proceedToCheckout() {
  alert("Processing checkout...");
}

// Format price function
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
}

//clear all
function clearAllItems() {
  if (confirm("Are you sure you want to clear the cart?")) {
    CartStore.clearCart();
  }
}

// function calculateDiscountedPrice(item) {
//   const discount = parseFloat(item.book_discount) || 0; // Convert to number
//   return item.book_price - (item.book_price * discount / 100);
// }

function navigateToBooks() {
  router.push('/UserPage'); // Điều hướng đến HomePage
}

import { nextTick } from 'vue';

onMounted(() => {
  nextTick(() => {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      new bootstrap.Tooltip(el);
    });
  });
});


</script>

<style>
.text-primary {
  color: #073464 !important;
}

.tooltip {
  z-index: 1050 !important; /* Ensure tooltips appear above other elements */
}

.main-content {
  padding-top: 60px;
}

table.table {
  text-align: center;
  vertical-align: middle;
}
</style>
