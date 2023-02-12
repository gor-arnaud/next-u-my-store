<template>
  <div class="items-container">
    <cart-item
      v-for="item in cart"
      :item="item"
      :key="item.productId"
    ></cart-item>
  </div>
</template>
<script>
import CartItem from "../components/CartItem.vue";

export default {
  name: "Cart",
  components: {
    CartItem,
  },
  computed: {
    cart: function () {
      return this.$store.state.cart;
    },
  },
};
</script>
<style scoped>
.items-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>