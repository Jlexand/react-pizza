import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

export type CartItem = {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    type: string;
    size: number;
    count: number;
}

interface CartSliceState {
    totalPrice: number;
    itemsAll: number;
    items: CartItem[];
}

const initialState: CartSliceState = {
    totalPrice: 0,
    itemsAll: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
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
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload);
        },
        clearItems(state) {
            state.totalPrice = 0;
            state.items = [];
            state.itemsAll = 0;
        },
    },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)

export const { clearItems, removeItem, addItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;