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
  /////////////
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
      <nav className="bg-gray-100 static lg:fixed top-0 right-0 left-0 z-50">
        <div className="container mx-auto py-1 flex-col lg:flex-row flex justify-between items-center">
          <div className="flex justify-between items-center w-full lg:w-auto">
            <NavLink className="flex mx-2" to="">
              <img src={logo} alt="logo" width="110px" />
              {userLogin ? (
                <ul className="lg:flex flex-row items-center hidden lg:visible">
                  <li className="py-2">
                    <NavLink
                      className=" font-normal mx-2 text-slate-900 text-lg "
                      to=""
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 text-lg"
                      to="cart"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 text-lg"
                      to="products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 text-lg"
                      to="brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 text-lg"
                      to="categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="font-normal mx-2 text-slate-900 text-lg"
                      to="wishlist"
                    >
                      WishList
                    </NavLink>
                  </li>
                </ul>
              ) : null}
            </NavLink>
            <button
              className="lg:hidden text-2xl p-2"
              onClick={toggleMobileMenu}
            >
              &#9776; {/* Unicode character for hamburger menu */}
            </button>
          </div>
          <div
            className={`${isMobileMenuOpen ? "block" : "hidden"
              } lg:flex flex-col lg:flex-row items-center w-full lg:w-auto`}
          >
            <ul className="flex flex-col items-center lg:hidden ">
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 text-lg"
                  to=""
                >
                  Home
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 text-lg"
                  to="cart"
                >
                  Cart
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 text-lg"
                  to="products"
                >
                  Products
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 text-lg"
                  to="brands"
                >
                  Brands
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-light mx-2 text-slate-900 text-lg"
                  to="categories"
                >
                  Categories
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className="font-normal mx-2 text-slate-900 text-lg"
                  to="wishlist"
                >
                  WishList
                </NavLink>
              </li>
              <li>

              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row items-center mt-4 lg:mt-0">
              {userLogin ? (
                ""
              ) : (
                <li className="py-2">
                  <NavLink
                    className="font-light mx-2 text-slate-900 text-lg"
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
                    className="font-light mx-2 text-slate-900 text-lg"
                    to="register"
                  >
                    Register
                  </NavLink>
                </li>
              )}
              {userLogin ? (
                <>
                  <li className='py-2'>
                    <NavLink to={'/cart'} className='mx-2 relative text-lg text-slate-900 font-light cursor-pointer' >
                      <i class="fa-solid fa-cart-shopping text-2xl"></i>
                      <span className='bg-green-600 text-white px-1 absolute text-xs top-[-3px] right-[-5px] rounded-2xl'>{cart?.numOfCartItems}</span>

                    </NavLink>
                  </li>
                  <li onClick={logOut} className='py-2'> <span className='mx-2 text-lg text-slate-900 font-light cursor-pointer'  >Logout</span></li>

                </>

              ) : (
                " "
              )}
              <li className="flex items-center py-2 cursor-pointer">
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
              </li>
              <li>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={handleThemeSwitch}
                    checked={theme === "dark"}
                  />
                  <div
                    className={`relative w-11 h-6 bg-gray-200 outline-none peer-focus:ring-green-300 dark:peer-focus:ring-green-800 
              rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full border-none after:content-[''] 
                after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600`}
                  ></div>
                </label>
              </li>
            </ul>

          </div>

        </div>
      </nav>
    </>
  );
}
