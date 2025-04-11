import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
// import About from "./components/About/About";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/productDetails/productDetails";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";
import ShippingAddress from "./components/shippingAddress/shippingAddress";
import Allorders from "./components/AllOrders/Allorders";
import Wishlist from "./components/wishList/wishList";
import CartContextProvider from "./context/CartContext";

let routing = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "about",
      //   element: (
      //     <ProtectedRoute>
      //       <About />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "shippingaddress/:cartId",
        element: (
          <ProtectedRoute>
            <ShippingAddress />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <ProtectedRoute>
            {" "}
            <NotFound />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div>
        <CartContextProvider>
          <RouterProvider router={routing}></RouterProvider>
          <ReactQueryDevtools initialIsOpen="false" />
        </CartContextProvider>
      </div>
    </>
  );
}

export default App;
