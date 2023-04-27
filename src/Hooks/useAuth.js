import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL, BASE_ROUTE } from '../constants';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../services/ApiServicesUser';
import { LogIn } from '../components/userLogInSlice';
import { useDispatch, useSelector } from 'react-redux';
import { initFavoritProducts, initListOfMyProducts } from '../components/listProductsSlice';

// כרגע לא בשימוש

export default function useAuth() {
    const dispatch = useDispatch();
    const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);
    const listOfFavoritProducts = useSelector((state) => state.reducer.listProducts.listOfFavoritProducts);

    useEffect(() => {
        if (!userLogIn || !listOfFavoritProducts[0]) {
            setIsAuth()
        }
    }, [])

    const setIsAuth = async () => {
        try {
            const data = await isAuth();
            console.log(data)
            dispatch(LogIn(data?.userInfo));
            dispatch(initListOfMyProducts(data?.listOfMyProducts));
            dispatch(initFavoritProducts(data?.listOfFavoritProducts));
        } catch (err) {
            return err
        }
    }
    return {userLogIn, listOfFavoritProducts}
}