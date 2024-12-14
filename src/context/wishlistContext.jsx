import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingScreen from "../components/Loading/Loading";

export const WishlistContext = createContext();
export function useWishlist() {
  return useContext(WishlistContext);
}
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserWishlist();
  }, []);

  async function getUserWishlist() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      if (data && Array.isArray(data.data)) {
        setWishlist(data.data);
        console.log(wishlist);
      } else {
        console.error("Unexpected data format:", data);
        toast.error("Unexpected data format received");
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addToWishlist(productId) {
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist/`,
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      getUserWishlist();

      return true;
    } catch (error) {
      return false;
    }
  }

  async function productRemove(productId) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      getUserWishlist();
      toast.success("Product removed from wishlist successfully");
    } catch (error) {}
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, isLoading, addToWishlist, productRemove }}
    >
      {isLoading ? <LoadingScreen /> : children}
    </WishlistContext.Provider>
  );
}
