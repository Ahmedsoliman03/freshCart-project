import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import LoadingScreen from "../Loading/Loading";
import { cartContext } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import { useWishlist } from "../../context/wishlistContext";

export default function ProductDetails() {
  let { addProductToCart } = useContext(cartContext);

  let { id, category } = useParams();
  const [productDetails, setProductDetaisl] = useState();
  const [relatedProduct, setRelatedProductl] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingDetails, setLoadingDetails] = useState(false);
  const [currentproductId, setCurrentProductId] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [currentWishlistId, setCurrentWishlistId] = useState(0);

  const { addToWishlist } = useWishlist();

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetaisl(data.data);
        setLoadingDetails(true);
      });
  }
  function getRelatedProduct(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data?.data;
        let sameProducts = allProducts?.filter(
          (product) => product?.category.name === category
        );
        setRelatedProductl(sameProducts);
        setLoading(true);
      });
  }
  async function addProduct(productId) {
    setCurrentProductId(productId);
    setLoading(true);
    let response = await addProductToCart(productId);
    console.log(response);
    if (response.data.status == "success") {
      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error(response.data.message);
    }
  }
  useEffect(() => {
    getProductDetails(id);
    getRelatedProduct(category);
  }, [id]);
  async function handleAddToWishlist(productId) {
    setWishlistLoading(true);
    setCurrentWishlistId(productId);
    if (addToWishlist) {
      const resFlag = await addToWishlist(productId);
      if (resFlag) {
        toast.success("Product added to wishlist successfully");
        setWishlistLoading(false);
      } else {
        toast.error("Error adding product to wishlist");
        setWishlistLoading(false);
      }
    } else {
      console.error("addToWishlist function is not defined in WishlistContext");
    }
  }
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  let settings2 = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
  };

  return (
    <>
      <Helmet>
        <title>Details</title>
      </Helmet>
      <ToastContainer /> {/* Add this component */}
      {isLoadingDetails ? (
        <div className="row">
          <div className="w-1/4">
            <Slider {...settings}>
              {productDetails?.images?.map((image) => {
                return (
                  <div>
                    <img src={image} alt={productDetails?.title} />
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="w-3/4 p-6">
            <h1 className="text-lg text-gray-950 dark:text-white font-normal">
              {productDetails?.title}
            </h1>
            <p className="text-gray-600 dark:text-white font-light mt-4">
              {productDetails?.description}
            </p>
            <div className="flex justify-between my-4">
              <span className="text-gray-500 dark:text-white text-sm">
                {productDetails?.price} EGP
              </span>
              <span>
                <i className="fa-solid fa-star text-[#FFD43B]"></i>
                {productDetails?.ratingsAverage}
              </span>
            </div>
            <button
              disabled={currentproductId == productDetails.id && isLoading}
              className="btn disabled:bg-gray-400"
              onClick={() => addProduct(productDetails.id)}
            >
              {currentproductId == productDetails.id && isLoading ? (
                <i class="fa-solid fa-spinner fa-spin-pulse"></i>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <LoadingScreen />
        </div>
      )}
      <div className="row">
        <div className="w-full  p-4">
          <Slider {...settings2}>
            {relatedProduct.map((product, index) => {
              return (
                <div className="product px-3">
                  <Link
                    key={index}
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <img
                      className="w-full "
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className="block font-light text-green-600 dark:text-green-400">
                      {product.category.name}
                    </span>
                    <h3 className="mt-2 text-lg font-normal text-gray-600 dark:text-white mb-4">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-white text-sm">
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
                    className="disabled:bg-gray-400 mt-2 p-2 rounded-lg bg-yellow-200  text-black hover:bg-yellow-200 w-full"
                  >
                    {wishlistLoading && currentWishlistId == product.id ? (
                      <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    ) : (
                      "Add to Wishlist"
                    )}
                  </button>
                  <button
                    disabled={currentproductId == product.id && isLoading}
                    className="btn disabled:bg-gray-400"
                    onClick={() => addProduct(product.id)}
                  >
                    {currentproductId == product.id && isLoading ? (
                      <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                    ) : (
                      "Add to cart"
                    )}
                  </button>
                  
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      {/* {isLoading ? (
        <div className="row">
          <div className="w-full  p-4">
            <Slider {...settings2}>
              {relatedProduct.map((product, index) => {
                return (
                  <Link
                    key={index}
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <div className="product">
                      <img
                        className="w-full "
                        src={product.imageCover}
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
                      <button className="btn">Add to cart</button>
                    </div>
                  </Link>
                );
              })}
            </Slider>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <LoadingScreen />
        </div>
      )} */}
    </>
  );
}
