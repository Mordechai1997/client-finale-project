import { useEffect, useState } from 'react'
import { Login } from './Login';
import { SignUp } from './SignUp';
import { ResetPasswordEmail } from './ResetPasswordEmail'
import { ResetPassword } from './ResetPassword'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveNavBar from './NavBar';
import Publish from './Publish';
import Product from './Product';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from "react-redux";
import ButtonAddNewProduct from './ButtonAddNewProduct'
import HomePage from './HomePage';
import Spinner from "./Spinner";
import Profile from './Profile';
import FavoritProductsPage from './FavoritProductsPage';
import OpenRoute from './OpenRoute';
import MyProductsPage from './MyProductsPage';


function App() {

  const [isLoading, setIsLoading] = useState(true)
  const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);

  useEffect(() => {
    setIsLoading(false)
  }, [])



  return (
    <div >
      <Spinner isLoading={isLoading} />
      <BrowserRouter>
        <ResponsiveNavBar />
        <Routes >
          <Route path="/" element={<ProtectedRoute children={<HomePage />} />} />
          <Route path="/home" element={<ProtectedRoute children={<HomePage />} />} />
          <Route path="/login" element={<OpenRoute children={<Login />} />} />
          <Route path="/signup" element={<OpenRoute children={<SignUp />} />} />
          <Route path="/contact" element={<OpenRoute children={<Login />} />} />
          <Route path="/reset-password-email" element={<OpenRoute children={<ResetPasswordEmail />} />} />
          <Route path="/reset-password" element={<OpenRoute children={<ResetPassword />} />} />
          <Route path="/publish" element={<ProtectedRoute children={<Publish />} />} />
          <Route path="/Product" element={<ProtectedRoute children={<Product />} />} />
          <Route path="/Profile" element={<ProtectedRoute children={<Profile />} />} />
          <Route path="/favorit-products" element={<ProtectedRoute children={<FavoritProductsPage />} />} />
          <Route path="/my-products" element={<ProtectedRoute children={<MyProductsPage />} />} />
        </Routes>
        {userLogIn && <ButtonAddNewProduct />}
      </BrowserRouter>
    </div>
  );
}

export default App;
