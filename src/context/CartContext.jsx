import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {


  const [cart, setCart] = useState(null);



  let headers = {
    token: localStorage.getItem("userToken"),
  };
  // let headers = localStorage.getItem("userToken");
  function getLogedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  //add to cart
  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  //update products
  function updateProductToCart(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  //delete product from cart
  function deleteProductFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  //clear cart
  function deleteCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }


  async function getCart() {
    let response = await getLogedUserCart();
    setCart(response.data);
  }

  useEffect(() => {
    
    getCart();

  }, []);



  return (
    <cartContext.Provider
      value={{
        getLogedUserCart,
        addProductToCart,
        updateProductToCart,
        deleteProductFromCart,
        deleteCart,
        cart,
        setCart,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
