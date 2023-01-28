import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from '../store';
import { Sort } from './filterSlice';

type Pizza = {
    id: string;
    title: string;
    price: number;
    types: number[];
    imageUrl: string;
    sizes: number[];
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: Pizza[],
    status: Status;
}

export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;

}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, //loading | success | error
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://62d057061cc14f8c0888fda2.mockapi.io/items?page=${currentPage}&limit=4${sortBy}&sortBy=${category}${order}${search}`,
        );
        return data;
    }
)

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
            console.log('отправка...')
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.items = action.payload;
            console.log('OK', state.items)
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
            console.log('ERROR')
        })
    }
});

export const selectPizzas = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;