import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    totalPrice: 0,
    items: [],
    itemsAll: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.itemsAll = state.items.reduce((sum, obj) => {
                return obj.count + sum
            }, 0)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return ((obj.price * obj.count) + sum);
            }, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload);
        },
        clearItems(state) {
            state.totalPrice = 0;
            state.items = [];
            state.itemsAll = 0;
        },
    },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id)

export const { clearItems, removeItem, addItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;