import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { cartContext } from "../../context/CartContext";
import LoadingScreen from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [counterLoading, setCounterLoading] = useState(false);
  const [deleteLoading, setdeleteLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(0);
  const [clearCart, setClearCart] = useState(false);
  const [numOfItems, setNumOfItems] = useState();

  let {
    getLogedUserCart,
    updateProductToCart,
    deleteProductFromCart,
    deleteCart,
    setCart,
  } = useContext(cartContext);

  async function getCartItems() {
    let response = await getLogedUserCart();
    setCartItems(response.data.data);
    setLoading(true);
    setClearCart(false);

    if (response.data.data.products.length == 0) {
      setClearCart(true);
    }
    setNumOfItems(response?.data.data.products.length);
  }

  async function updateCartCount(productId, count) {
    setCurrentProduct(productId);
    setCounterLoading(true);
    let response = await updateProductToCart(productId, count);
    setCartItems(response?.data.data);
    setCounterLoading(false);
    if (response.data.data.products.length == 0) {
      setClearCart(true);
    }
  }

  async function deleteItemFromCart(productId) {
    setCurrentProduct(productId);
    setdeleteLoading(true);
    let response = await deleteProductFromCart(productId);
    setCartItems(response.data.data);
    setCart(response.data);
    setdeleteLoading(false);
    if (response.data.data.products.length == 0) {
      setClearCart(true);
    }
  }

  async function deleteAllProducts() {
    setClearLoading(true);
    let response = await deleteCart();
    setCartItems(response.data.data);
    setClearLoading(false);

    if (response.statusText == "OK") {
      setClearCart(true);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {clearCart ? (
        <div className="h-screen flex justify-center items-center dark:bg-gray-900">
          <h2 className="text-green-600 dark:text-yellow-400 mt-4 font-semibold text-3xl">
            Cart is Empty
          </h2>
        </div>
      ) : loading ? (
        <div className="relative sm:overflow-x-hidden overflow-x-auto sm:rounded-lg dark:bg-gray-900">
          <h2 className="text-3xl text-green-600 dark:text-yellow-400 py-5 text-center">
            Shopping Cart
          </h2>
          <div className="flex flex-wrap justify-between w-[50%] mx-auto flex-col items-center md:flex-row">
            <h3 className="text-lg font-light text-slate-600 dark:text-gray-300 py-5 text-center">
              Total Cart Price : {cartItems?.totalCartPrice} EGP
            </h3>
            <h3 className="text-lg font-light text-slate-600 dark:text-gray-300 py-5 text-center">
              Number of products : {cartItems?.products.length}
            </h3>
            <div className="flex justify-start gap-2 w-full m-3">
              <button
                disabled={clearLoading}
                onClick={deleteAllProducts}
                className="bg-green-600 dark:bg-yellow-500 disabled:bg-gray-400 px-4 py-2 rounded-lg text-white dark:text-gray-900 mt-2 hover:bg-green-700 dark:hover:bg-yellow-600"
              >
                {clearLoading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Clear Your Cart"
                )}
              </button>
              <Link
                to={"/shippingaddress/" + cartItems?._id}
                className="bg-green-600 dark:bg-yellow-500 disabled:bg-gray-400 px-4 py-2 rounded-lg text-white dark:text-gray-900 mt-2 hover:bg-green-700 dark:hover:bg-yellow-600"
              >
                Check Out
              </Link>
            </div>
          </div>

          <table className="w-3/4 my-1 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.products.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateCartCount(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div className="ms-3">
                          {counterLoading &&
                          product.product.id === currentProduct ? (
                            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                          ) : (
                            <span className="dark:text-white">{product.count}</span>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            updateCartCount(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">
                      <span className="whitespace-nowrap">
                        {product.price} EGP
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteItemFromCart(product.product.id)}
                        className="font-medium text-red-600 dark:text-yellow-400 cursor-pointer hover:text-red-800 dark:hover:text-yellow-500"
                      >
                        {deleteLoading &&
                        currentProduct == product.product.id ? (
                          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                        ) : (
                          <p className="whitespace-nowrap">
                            Remove <i className="fa-solid fa-trash"></i>
                          </p>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center dark:bg-gray-900">
          <LoadingScreen />
        </div>
      )}
    </>
  );
}
