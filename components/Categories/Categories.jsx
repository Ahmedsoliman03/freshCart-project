import axios from "axios";
import LoadingScreen from "../Loading/Loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
export default function Categories() {
  const [allCategoriews, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  function getAllCategories() {
    setLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setAllCategories(data?.data);
        console.log(allCategoriews);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="container py-5 w-[90%] mx-auto">
        <h2 className="text-center text-green-600 dark:text-yellow-400 mt-4 font-semibold text-3xl">
          All Categories
        </h2>
        {loading ? (
          <div className="h-screen flex justify-center items-center">
            <LoadingScreen />
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
            {allCategoriews?.map((brand) => (
              <div
                key={brand._id}
                className="brand p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg dark:shadow-gray-700 transition-shadow duration-300"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="object-cover w-full h-40 rounded-t-xl"
                />
                <h2 className="text-center text-green-600 dark:text-yellow-400 mt-4 font-semibold">
                  {brand.name}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
