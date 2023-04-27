import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import userLogInSlice from "./userLogInSlice";
import categorySlice from './categorySlice';
import listProductsSlice from './listProductsSlice';



const reducer = combineReducers({
    userlogin: userLogInSlice,
    categorys: categorySlice,
    listProducts: listProductsSlice
  })
  

export const store = configureStore({
    reducer: {
        reducer,
    }
});
