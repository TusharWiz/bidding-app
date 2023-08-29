import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HeroSection from "./component/HeroSection";
import AboutUs from "./page/AboutUs";
import Footer from "./component/Footer";
import Login from "./page/Login";
import Navbar from "./component/Navbar";
import SignUp from "./page/SignUp";
import ProductList1 from "./page/ProductList1";
import AddProductByAdmin from "./page/AddProductByAdmin";
import SelectedProduct from "./page/SelectedProduct";
import Cart from "./page/Cart";
import Dashboard from "./page/Dashboard";
import Address from "./page/Address";
import ContactUs from "./page/ContactUs";

function App() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const location = useLocation();

  return (
    <>
      {!isLoginPage && location.pathname !== "/signup" && (
        <Navbar loginData={isLoginPage} />
      )}
      <Routes>
      
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          exact path="/login"
          element={<Login setIsLoginPage={setIsLoginPage} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<ProductList1 />} />
        <Route path="/addProduct" element={<AddProductByAdmin />} />
        <Route path={"/selectedProduct/:productId"} element={<SelectedProduct />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path="/dashBoard" element={<Dashboard />} />
        <Route path={"/address"} element={<Address />} />
        <Route  path={'/contact'}element={<ContactUs/>}/>
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;