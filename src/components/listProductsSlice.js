import { createSlice } from "@reduxjs/toolkit"; 


const initialState = {
    listOfFavoritProducts: [],
    listOfMyProducts: [],
};
export const listProductsSlice = createSlice({
    name: "favoritProducts",
    initialState,
    reducers: {
        initFavoritProducts: (state, action) => {
            state.listOfFavoritProducts = action.payload;
        },
        initListOfMyProducts:(state, action) => {
            state.listOfMyProducts = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { initFavoritProducts , initListOfMyProducts} = listProductsSlice.actions;

export default listProductsSlice.reducer;
