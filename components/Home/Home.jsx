import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import { CounterContext } from "../../context/CounterContext";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../categoriesSlider/categoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
export default function Home(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {}, []);
  let { counter, handleCounter } = useContext(CounterContext);
  return (
    <>
      <div className="overflow-hidden dark:bg-gray-900">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <MainSlider />
        <CategoriesSlider />
        <RecentProducts />
      </div>
    </>
  );
}
