import Form from './Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL, BASE_ROUTE } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { LogIn, LogOut } from "./userLogInSlice";
import { isAuth } from '../services/ApiServicesUser';
import { initFavoritProducts, initListOfMyProducts } from './listProductsSlice';

export default function OpenRoute({ children }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getIsAuth();
    }, [])

    const getIsAuth = async () => {
        try {
            await isAuth();
            setIsLoading(false)
            navigate('/')
        } catch (err) {
            setIsLoading(false)

        }
    }
    return (<>
        {isLoading ? "Loading...." : children}
    </>);
}
