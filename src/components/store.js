import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import userLogInSlice from "./userLogInSlice";
import categorySlice from './categorySlice';



const reducer = combineReducers({
    userlogin: userLogInSlice,
    categorys: categorySlice
  })
  

export const store = configureStore({
    reducer: {
        reducer,
    }
});
