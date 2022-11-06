import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = filterSlice.actions

export default filterSlice.reducer