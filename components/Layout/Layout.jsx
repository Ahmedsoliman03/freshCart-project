import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
export default function Layout() {
  const [count, setCount] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 py-6 dark:bg-gray-900">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
