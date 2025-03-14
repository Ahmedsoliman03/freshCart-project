"use client";

import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { cartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { useWishlist } from "../../context/wishlistContext";

export default function RecentProducts() {
  const { addProductToCart, setCart } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [currentWishlistId, setCurrentWishlistId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistLoading, setWishlistLoading] = useState(false);

  function getRecent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecent,
    staleTime: 0,
    gcTime: 4000,
    select: (data) => data.data.data,
  });

  async function addProduct(productId) {
    setCurrentProductId(productId);
    setLoading(true);

    try {
      const response = await addProductToCart(productId);
      toast.success(response.data.message);
      setCart(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      // Always reset loading state regardless of success or failure
      setLoading(false);
    }
  }

  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /////
  const { addToWishlist } = useWishlist();
  async function handleAddToWishlist(productId) {
    setWishlistLoading(true);
    setCurrentWishlistId(productId);

    try {
      if (addToWishlist) {
        const resFlag = await addToWishlist(productId);
        if (resFlag) {
          toast.success("Product added to wishlist successfully");
        } else {
          toast.error("Error adding product to wishlist");
        }
      } else {
        console.error(
          "addToWishlist function is not defined in WishlistContext"
        );
        toast.error("Wishlist functionality is not available");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add product to wishlist");
    } finally {
      // Always reset wishlist loading state regardless of outcome
      setWishlistLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-center text-green-600 mt-4 font-semibold text-3xl">
        All Products
      </h2>
      <div className="m-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      {!isLoading ? (
        <div className="row">
          {filteredProducts.map((product, indx) => {
            return (
              <div
                key={indx}
                className="main w-full sm:w-1/3 md:w-1/4 lg:w-1/6 p-4"
              >
                <div className="product">
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <img
                      className="w-full"
                      src={product.imageCover || "/placeholder.svg"}
                      alt={product.title}
                    />
                    <span className="block font-light text-green-600">
                      {product.category.name}
                    </span>
                    <h3 className="mt-2 text-lg font-normal text-gray-600 mb-4">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">
                        {product.price} EGP
                      </span>
                      <span>
                        <i className="fa-solid fa-star text-[#FFD43B]"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    disabled={
                      wishlistLoading && currentWishlistId == product.id
                    }
                    onClick={() => handleAddToWishlist(product._id)}
                    className="disabled:bg-gray-400 mt-2 p-2 rounded-lg bg-blue-500 text-black hover:bg-blue-500 w-full"
                  >
                    {wishlistLoading && currentWishlistId == product.id ? (
                      <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    ) : (
                      "Add to Wishlist"
                    )}
                  </button>
                  <button
                    disabled={currentProductId === product.id && loading}
                    className="btn showHide disabled:bg-gray-400"
                    onClick={() => addProduct(product.id)}
                  >
                    {currentProductId === product.id && loading ? (
                      <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    ) : (
                      "Add to cart"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <LoadingScreen />
        </div>
      )}
    </>
  );
}
