import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import style from "./Navbar.module.css";
import { UserContext } from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";
import LanguageSwitcher from "./../Language/LanguageSwitcher";

export default function Navbar() {
  const [numOfItems, setNumOfItems] = useState();
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { getLogedUserCart, addProductToCart, cart } = useContext(cartContext);

  //Dark mode
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function handleThemeSwitch() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  async function numOfCart() {
    let { data } = await getLogedUserCart();
    setNumOfItems(data.numOfCartItems);
    console.log(numOfItems);
  }

  useEffect(() => {
    numOfCart();
    console.log(numOfItems, "useEffect");
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className=" dark:bg-gray-900 static lg:fixed top-0 right-0 left-0 z-50">
        <div className="container mx-auto py-1 flex-col lg:flex-row flex justify-between items-center">
          <div className="flex justify-between items-center w-full lg:w-auto">
            <NavLink className="flex mx-2" to="">
              <img src={logo} alt="logo" width="110px" />
              {userLogin ? (
                <ul className="lg:flex flex-row items-center hidden lg:visible">
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 dark:text-gray-200 text-lg"
                      to=""
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 dark:text-gray-200 text-lg"
                      to="cart"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 dark:text-gray-200 text-lg"
                      to="products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 dark:text-gray-200 text-lg"
                      to="brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 dark:text-gray-200 text-lg"
                      to="categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 dark:text-gray-200 text-lg"
                      to="wishlist"
                    >
                      WishList
                    </NavLink>
                  </li>
                </ul>
              ) : null}
            </NavLink>
            <button
              className="lg:hidden text-2xl p-2 dark:text-white"
              onClick={toggleMobileMenu}
            >
              &#9776;
            </button>
          </div>
          <div
            className={`${isMobileMenuOpen ? "block" : "hidden"}
              } lg:flex flex-col lg:flex-row items-center w-full lg:w-auto`}
          >
            <ul className="flex flex-col items-center lg:hidden">
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 dark:text-gray-200 text-lg"
                  to=""
                >
                  Home
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 dark:text-gray-200 text-lg"
                  to="cart"
                >
                  Cart
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 dark:text-gray-200 text-lg"
                  to="products"
                >
                  Products
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 dark:text-gray-200 text-lg"
                  to="brands"
                >
                  Brands
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 dark:text-gray-200 text-lg"
                  to="categories"
                >
                  Categories
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-normal mx-2 text-slate-900 dark:text-gray-200 text-lg"
                  to="wishlist"
                >
                  WishList
                </NavLink>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row items-center mt-4 lg:mt-0">
              {userLogin ? (
                ""
              ) : (
                <li className="py-2">
                  <NavLink
                    className="font-light mx-2 text-slate-900 dark:text-gray-200 text-lg"
                    to="login"
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {userLogin ? (
                ""
              ) : (
                <li className="py-2">
                  <NavLink
                    className="font-light mx-2 text-slate-900 dark:text-gray-200 text-lg"
                    to="register"
                  >
                    Register
                  </NavLink>
                </li>
              )}
              {userLogin ? (
                <>
                  <li className="py-2">
                    <NavLink
                      to={"/cart"}
                      className="mx-2 relative text-lg text-slate-900 dark:text-gray-200 font-light cursor-pointer"
                    >
                      <i class="fa-solid fa-cart-shopping text-2xl"></i>
                      <span className="bg-green-600 dark:bg-yellow-500 text-white dark:text-gray-900 px-1 absolute text-xs top-[-3px] right-[-5px] rounded-2xl">
                        {cart?.numOfCartItems}
                      </span>
                    </NavLink>
                  </li>
                  <li onClick={logOut} className="py-2">
                    <span className="mx-2 text-lg text-slate-900 dark:text-gray-200 font-light cursor-pointer">
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                " "
              )}
              <li className="flex items-center py-2 cursor-pointer">
                <i className="fab fa-facebook mx-2 dark:text-gray-200"></i>
                <i className="fab fa-instagram mx-2 dark:text-gray-200"></i>
                <i className="fab fa-tiktok mx-2 dark:text-gray-200"></i>
                <i className="fab fa-youtube mx-2 dark:text-gray-200"></i>
                <i className="fab fa-twitter mx-2 dark:text-gray-200"></i>
              </li>
              <li>
                <button
                  onClick={handleThemeSwitch}
                  className="flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-300"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <i className="fa-solid fa-sun text-white "></i>
                  ) : (
                    <i className="fa-solid fa-moon"></i>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
