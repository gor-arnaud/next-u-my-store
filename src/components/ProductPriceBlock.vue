<template>
  <div class="block-container">
    <label>Prix unitaire</label><span>{{ item.productPrice }}</span>
    <quantity-selector
      :productId="productId"
      class="quantity-container"
    ></quantity-selector>
    <label>Sous-total</label><span>{{ subtotal }}</span>
  </div>
</template>
<script>
import QuantitySelector from "../components/QuantitySelector.vue";

export default {
  name: "ProductPriceBlock",
  components: { QuantitySelector },
  props: {
    productId: {
      type: String,
      default: "",
    }
  },
  computed: {
    cartItem: function () {
      return this.$store.getters.getCartItem(this.productId);
    },
    quantity: function () {
      return this.item?.productQuantity ?? 0;
    },
    subtotal: function () {
      return this.item?.productSubTotal ?? 0;
    },
  },
};
</script>
<style scoped>
.block-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.quantity-container {
  grid-column: span 2;
}
</style>