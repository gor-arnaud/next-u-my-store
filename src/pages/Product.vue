<template>
  <div>
    <header></header>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Product",
  data() {
    return {
      product: {},
    };
  },
  props: {
    productId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    dataUrl: function () {
      return `https://dummyjson.com/products/${this.productId}`;
    },
  },
  methods: {
    fetchProduct: function () {
      axios
        .get(this.dataUrl)
        .then(({ data }) => (this.product = data))
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>