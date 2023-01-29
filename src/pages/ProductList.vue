<template>
  <div class="product-list">
    <product-card
      :product="product"
      class="product-card"
      v-for="product in products"
      :key="product.id"
      @click="gotoProduct(product)"
    ></product-card>
  </div>
</template>
<script>
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";

export default {
  name: "ProductList",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    dataUrl: function () {
      return "https://dummyjson.com/products";
    },
  },
  methods: {
    fetchProduts: function () {
      axios
        .get(this.dataUrl)
        .then(({ data }) => (this.products = data.products))
        .catch((error) => console.error(error));
    },
    gotoProduct(product) {
      this.$router.push({ name: "product", params: { id: product.id } });
    },
  },
  mounted() {
    this.fetchProduts();
  },
};
</script>
<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
  width: 300px;
}
</style>