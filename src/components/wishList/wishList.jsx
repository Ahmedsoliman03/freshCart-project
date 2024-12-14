import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../Loading/Loading";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function WishlistProduct({ product, productRemove }) {
  return (
    <div className=" p-3 mb-4 border rounded-lg shadow-md w-[50%] sm:w-1/3 md:w-1/4 lg:w-1/4">
      <img src={product.imageCover} alt={product.title} className="w-full" />
      <h2 className="text-xl font-semibold">
        {product.title.split(" ").slice(0, 2).join(" ")}
      </h2>
      <p className="text-gray-700 dark:text-white">Price: ${product.price}</p>
      <button
        onClick={() => productRemove(product._id)}
        className="mt-2 text-red-500 hover:text-red-700"
      >
        Remove from wishlist
      </button>
    </div>
  );
}

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [t, i18n] = useTranslation();
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
        console.log(data.data);
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
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="items-center container px-4 md:px-6 2xl:px-0 py-12 flex flex-col ">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">
            {t("Favourites")}
          </h1>
          <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">
            {wishlist.length} {t("items")}
          </p>
          <div className="flex flex-wrap gap-x-2 mt-4 w-full justify-center">
            {wishlist.map((product) => (
              <WishlistProduct
                key={product._id}
                product={product}
                productRemove={productRemove}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
