<template>
    
</template>
<script>
export default {
    name: "CartWidget",
    computed: {
        cartCount: function() {
            return this.$store.cart.length
        }
    }
}
</script>