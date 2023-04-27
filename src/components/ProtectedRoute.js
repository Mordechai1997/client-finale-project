import Form from './Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL, BASE_ROUTE } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { LogIn, LogOut } from "./userLogInSlice";
import { isAuth } from '../services/ApiServicesUser';
import { initFavoritProducts, initListOfMyProducts } from './listProductsSlice';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)
  const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);

  useEffect(() => {
    getIsAuth();
  }, [])

  const getIsAuth = async () => {
    try {
      const data = await isAuth();
      console.log(data)
      dispatch(LogIn(data?.userInfo));
      dispatch(initFavoritProducts(data?.listOfFavoritProducts));
      dispatch(initListOfMyProducts(data?.listOfMyProducts));
      setIsLoading(false)
    } catch (err) {
      navigate('/login')
    }
  }
  return (<>
    {isLoading ? "Loading...." : children}
  </>);
}
