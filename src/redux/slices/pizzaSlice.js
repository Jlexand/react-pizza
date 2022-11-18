import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params, thunkAPI) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get(
            `https://62d057061cc14f8c0888fda2.mockapi.io/items?page=${currentPage}&limit=4${sortBy}&sortBy=${category}${order}${search}`,
        );
        return data;
    }
)

const initialState = {
    items: [],
    status: 'loading', //loading | success | error
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
            console.log('отправка...')
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.status = 'success';
            state.items = action.payload;
            console.log('OK', state.items)
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
            console.log('ERROR')
        }
    }
});

export const selectPizzas = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;