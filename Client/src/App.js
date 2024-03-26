import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import SignUp from "./pages/Signin&up/Signup";
import Login from "./pages/Signin&up/Login";
import Forgotpassword from "./pages/Signin&up/Password/Forgotpassword";
import Verifypassword from "./pages/Signin&up/Password/Verifypassword";
import ResetPassword from "./pages/Signin&up/Password/Resetpassword";
import EmailVerification from "./pages/Signin&up/EmailVerification.js";
import Profle from "./pages/Profile/Profle.js";

import Notfound from "./pages/Notfound";

import Header from "./components/Header/Header.js";
import Header2 from "./components/Header/Header2.js";
import Nav from "./components/Header/Header3.js";
import Products from "./pages/Products/Products.js";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import ProductDetails from "./pages/Products/ProductDetails.js";
import SearchResults from "./components/Search/SearchResults.js";
import DeleteAccount from "./pages/Profile/DeleteAccount.js";
import UpdateAccount from "./pages/Profile/UpdateAccount.js";

export default function App() {
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  useEffect(() => {
    const handleRouteChange = () => {
      const excludedRoutes = [
        "/login",
        "/signup",
        "/forgetPassword",
        "/verifypassword",
        "/resetpassword",
        "/verify-email"
      ];
      const currentPath = window.location.pathname;
      const shouldShow = !excludedRoutes.includes(currentPath);
      setShouldShowHeader(shouldShow);
    };
    window.addEventListener("popstate", handleRouteChange);
    handleRouteChange();
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {shouldShowHeader && (
            <>
              <Header />
              <Header2 />
              <Nav />
            </>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="verify-email" element={<EmailVerification />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgetPassword" element={<Forgotpassword />} />
            <Route path="/verifypassword" element={<Verifypassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/profilePage" element={<Profle />} />
            <Route path="/deleteAccount" element={<DeleteAccount />} />
            <Route path="/updateAccount" element={<UpdateAccount />} />
            <Route path="*" element={<Notfound />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
