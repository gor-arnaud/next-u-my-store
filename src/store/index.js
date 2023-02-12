import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistencePlugin from "./plugins/persistencePlugin";

const isProductInCart = (state, productId) => {
    return state.cart.findIndex(item => item.productId === productId) !== -1;
}

const getCartItem = (state, productId) => {
    return state.cart.find(item => item.productId === productId);
}

Vue.use(Vuex);

// const persistencePlugin = createPersistencePlugin();

export default new Vuex.Store({
    state: {
        cart: []
    },
    // plugins: [persistencePlugin],
    getters: {
        isProductInCart: (state) => (productId) => {
            return isProductInCart(state, productId);
        },
        getCartItem: (state) => (productId) => {
            return getCartItem(state, productId);
        },
        cartTotal: (state) => {
            return state.cart.reduce((total, item) => total + item.productSubTotal, 0);
        },
        cartCount: (state) => {
            return state.cart.length;
        }
    },
    mutations: {
        ADD_PRODUCT_TO_CART: (state, payload) => {
            const cartItem = {
                productId: payload.product.id,
                productTitle: payload.product.title,
                productPrice: payload.product.price,
                productQuantity: payload.quantity,
                productSubTotal: payload.quantity * payload.product.price,
                productThumbnail: payload.product.thumbnail
            };

            state.cart.push(cartItem);
        },
        UPDATE_PRODUCT_IN_CART: (state, payload) => {
            const cartItem = getCartItem(state, payload.productId);

            if (cartItem) {
                cartItem.productQuantity = payload.quantity;
                cartItem.productSubTotal = cartItem.productQuantity * cartItem.productPrice;
            }
        },
        REMOVE_PRODUCT_FROM_CART: (state, payload) => {
            const index = state.cart.findIndex(item => item.productId === payload.productId);

            if (index !== -1)
                state.cart.splice(index, 1);
        }
    },
    actions: {
        updateProductOrderedQuantity: ({ getters, commit }, payload) => {
            const isInCart = getters.isProductInCart(payload.productId);

            if (payload.quantity === 0) {
                if (isInCart)
                    commit('REMOVE_PRODUCT_FROM_CART', { productId: payload.productId })
            } else {
                if (isInCart)
                    commit('UPDATE_PRODUCT_IN_CART', { productId: payload.productId, quantity: payload.quantity });
                else
                    commit('ADD_PRODUCT_TO_CART', { productId: payload.productId, quantity: payload.quantity });
            }
        }
    }
});