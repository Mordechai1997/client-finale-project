import { useEffect, useState } from 'react'
import { Login } from './Login';
import { SignUp } from './SignUp';
import { ResetPasswordEmail } from './ResetPasswordEmail'
import { ResetPassword } from './ResetPassword'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveNavBar from './NavBar';
import Publish from './Publish';
import Product from './Product';
import DraggableDialog from './PopUp'
import ProtectedRoute from './ProtectedRoute';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { SERVER_URL, BASE_ROUTE } from '../constants';
import { LogIn } from "./userLogInSlice";
import ButtonAddNewProduct from './ButtonAddNewProduct'
import HomePage from './HomePage';
import Spinner from "./Spinner";
import Profile from './Profile';
function App() {

  const dispatch = useDispatch();
  const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    isAuth();
  }, [])

  const isAuth = async () => {
    try {
      const data = await axios.get(`${SERVER_URL}/${BASE_ROUTE.AUTH}`, {
        withCredentials: true
      })
      dispatch(LogIn(data.data.userInfo));
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)

    }
  }

  return (
    <div >
      <Spinner isLoading={isLoading} />
      <BrowserRouter>
        <ResponsiveNavBar />
        <Routes >
          <Route path="/" element={userLogIn ? <HomePage /> : <Login />} />
          <Route path="/home" element={<ProtectedRoute children={<HomePage />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Login />} />
          <Route path="/reset-password-email" element={<ResetPasswordEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/publish" element={<ProtectedRoute children={<Publish />} />} />
          <Route path="/Product" element={<ProtectedRoute children={<Product />} />} />
          <Route path="/Profile" element={<ProtectedRoute children={<Profile />} />} />
        </Routes>
        {userLogIn && <ButtonAddNewProduct />}
      </BrowserRouter>
    </div>
  );
}

export default App;
