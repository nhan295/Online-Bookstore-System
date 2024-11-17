import { reactive, watch } from 'vue';

const getCartItems = () => {
  if (typeof localStorage !== 'undefined') {
    try {
      const items = JSON.parse(localStorage.getItem('cartItems'));
      if (Array.isArray(items)) {
        return items;
      }
    } catch (e) {
      console.error("Error reading cartItems from localStorage", e);
    }
  }
  return [];
};

const CartStore = reactive({
  cartItems: getCartItems(),

  // Add item to cart
  addToCart(book) {
    const existingItem = this.cartItems.find((item) => item.book_id === book.book_id);
    if (existingItem) {
      existingItem.quantity += 1; // increase if exist
    } else {
      this.cartItems.push({ ...book, quantity: 1 }); // add new book into cart
    }
  },

  // Remove item from cart
  removeFromCart(bookId) {
    const index = this.cartItems.findIndex((item) => item.book_id === bookId);
    if (index !== -1) {
      this.cartItems.splice(index, 1); // Remove item from the array
    }
  },

  // Clear cart
  clearCart() {
    this.cartItems.length = 0;
  },
  
});

let timeout;
watch(
  () => CartStore.cartItems,
  (newItems) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      localStorage.setItem('cartItems', JSON.stringify(newItems));
    }, 500);  // Delay write to localStorage by 500ms
  },
  { deep: true }
);

export default CartStore;
