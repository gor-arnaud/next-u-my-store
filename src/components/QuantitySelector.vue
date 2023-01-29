<template>
  <span>
    <button :disabled="quantity <= 0" @click="decrementQuantity">
      <span class="icon is-small">
        <i class="mdi mdi-minus"></i>
      </span></button
    ><input type="text" v-model="quantity" /><button @click="incrementQuantity">
      <span class="icon is-small">
        <i class="mdi mdi-plus"></i>
      </span>
    </button>
  </span>
</template>
<script>
export default {
  name: "QuantitySelector",
  data() {
    return {
      quantity: 0,
    };
  },
  props: {
    product: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    quantityInCart: function () {
      const cartItem = this.$store.getters.getCartItem();

      if (cartItem) return cartItem.quantity;

      return 0;
    },
  },
  methods: {
    updateQuantityInCart: function (newValue) {
      this.$store.dispatch("updateProductOrderedQuantity", {
        product: this.product,
        quantity: newValue,
      });
    },
    incrementQuantity: function () {
      this.quantity++;
    },
    decrementQuantity: function () {
      this.quantity--;
    },
  },
  watch: {
    quantity: function (newValue) {
      this.updateQuantityInCart(newValue);
    },
    quantityInCart: function (newValue) {
      this.quantity = newValue;
    },
  },
  mounted() {
    this.quantity = this.quantityInCart;
  },
};
</script>