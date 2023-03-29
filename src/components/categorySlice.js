import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listSelect: [],
    listProducts:[]
};
export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        SetListSelect: (state, action) => {
            state.listSelect = action.payload;
        },
        SetListProducts: (state, action) => {
            state.listProducts = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { SetListSelect , SetListProducts} = categorySlice.actions;

export default categorySlice.reducer;
