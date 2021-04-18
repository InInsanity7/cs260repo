<template>
<div>
    <h1>Your Cart</h1>
    <p v-if="this.$root.$data.cartSize === 0">Your cart is empty. Go get the goods!</p>
    <ProductList :products="cart" />
</div>
</template>

<script>
import ProductList from "../components/ProductList.vue"
export default {
  name: 'Browse',
  components: {
    ProductList
  },
  data() {
    return {
    }
  },
  computed: {
    cart() {
      return this.$root.$data.cart;
    }
  },
}
</script>

