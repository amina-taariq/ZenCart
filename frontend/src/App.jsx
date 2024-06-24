import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home"; // Ensure Home is a default export in your Home component file
import { MdCategory } from "react-icons/md";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import electronicsBanner from './assets/electronicsbanner.png'
import clothingBanner from "./assets/clothingbanner.png";
import cosmeticsBanner from "./assets/cosmeticsbanner.png";

export default function App() {
  return (
    <main className="bg-primary text-tertiary">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/clothing"
            element={
              <Category
                category={"clothing"}
                banner={clothingBanner}
              />
            }
          />
          <Route
            path="/cosmetics"
            element={
              <Category
                category={"cosmetic"}
                banner={cosmeticsBanner}
              />
            }
          />
          <Route
            path="/electronics"
            element={
              <Category
                category={"electronics"}
                banner={electronicsBanner}
              />
            }
          />
          <Route
            path="/product"
            element={<Product />}>
            <Route
              path=":productId"
              element={<Product />}
            />
          </Route>
          <Route
            path="/cart-page"
            element={<Cart />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}
