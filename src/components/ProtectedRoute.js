import Form from './Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL, BASE_ROUTE } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { LogIn, LogOut } from "./userLogInSlice";

export default function ProtectedRoute ({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    isAuth();
  }, [])

  const isAuth = async () => {
    try {
        const data  = await axios.get(`${SERVER_URL}/${BASE_ROUTE.AUTH}`, {
        withCredentials: true
      })
      dispatch(LogIn(data.data.userInfo));
      setIsLoading(false)
    } catch (err) {
        setIsLoading(false)
      navigate('/')
    }
  }
  return (<>
  {isLoading? "Loading....":children}
  </>);
}
