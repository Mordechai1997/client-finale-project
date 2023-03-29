import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'


const initialState = {
    userInfo: null
};
export const userLogInSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        LogIn: (state, action) => {
            state.userInfo = action.payload;
        },
        LogOut: (state) => {
            state.userInfo = null;
            Cookies.remove('token');
        }
    }
});

// Action creators are generated for each case reducer function
export const { LogIn, LogOut } = userLogInSlice.actions;

export default userLogInSlice.reducer;
