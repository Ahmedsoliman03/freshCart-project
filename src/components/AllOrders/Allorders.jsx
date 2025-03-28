import React, { useEffect, useState } from "react";
import style from "./Allorders.module.css";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Allorders() {
  function getAllOrders() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders`)
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <div className="min-h-screen dark:bg-[#131A22]"> {/* Dark background */}
        <div className="flex justify-center">
          <h2 className="text-center text-green-600 dark:text-[#FEBD69] mt-4 font-semibold text-3xl"> {/* Light: green, Dark: accent */}
            All Orders
          </h2>
        </div>
      </div>
    </>
  );
}
