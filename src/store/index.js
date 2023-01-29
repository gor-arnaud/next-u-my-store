import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistencePlugin from "./plugins/persistencePlugin";

const isProductInCart = (state, product) => {
    return state.cart.findIndex(item => item.productId === product.id) !== -1;
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
        isProductInCart: (state) => (product) => {
            return isProductInCart(state, product);
        },
        getCartItem: (state) => (product) => {
            return getCartItem(state, product);
        }
    },
    mutations: {
        ADD_PRODUCT_TO_CART: (state, payload) => {
            const cartItem = {
                productId: payload.product.id,
                productTitle: payload.product.title,
                productPrice: payload.product.price,
                productQuantity: payload.quantity,
                productSubTotal: payload.quantity * payload.product.price
            };

            state.cart.push(cartItem);
        },
        UPDATE_PRODUCT_IN_CART: (state, payload) => {
            const cartItem = getCartItem(state, payload.product.id);

            if (cartItem)
                cartItem.quantity = payload.quantity;
        },
        REMOVE_PRODUCT_FROM_CART: (state, payload) => {
            const index = state.cart.findIndex(item => item.productId === payload.product.id);

            if (index !== -1)
                state.cart.splice(index, 1);
        }
    },
    actions: {
        updateProductOrderedQuantity: ({ getters, commit }, payload) => {
            const isInCart = getters.isProductInCart(payload.product);

            if (payload.quantity === 0) {
                if (isInCart)
                    commit('REMOVE_PRODUCT_FROM_CART', { product: payload.product })
            } else {
                if (isInCart)
                    commit('UPDATE_PRODUCT_IN_CART', { product: payload.product, quantity: payload.quantity });
                else
                    commit('ADD_PRODUCT_TO_CART', { product: payload.product, quantity: payload.quantity });
            }
        }
    }
});