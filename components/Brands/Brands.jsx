import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [specificLoading, setspecificLoading] = useState(false);
  const [specificBrands, setSpecificBrands] = useState();

  function closeModel() {
    setIsModalOpen(!isModalOpen);
  }

  async function toggleModal(brandId) {
    setIsModalOpen(!isModalOpen);
    await getSpecificBrand(brandId);
  }

  function getAllBrands() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setBrands(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function getSpecificBrand(brandId) {
    setspecificLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
      .then(({ data }) => {
        setSpecificBrands(data.data);
        setspecificLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="min-h-screen dark:bg-gray-900">
        <h2 className="text-center text-green-600 dark:text-yellow-400 mt-4 font-semibold text-3xl">
          All Brands
        </h2>
        {loading ? (
          <div className="h-screen flex justify-center items-center dark:bg-gray-900">
            <LoadingScreen />
          </div>
        ) : (
          <div className="row">
            {brands?.map((brand) => (
              <button
                onClick={() => toggleModal(brand._id)}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                key={brand.id}
              >
                <div className="brand-style border border-3 border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-[0_0_10px_#FF9900]">
                  <img
                    src={brand?.image}
                    alt={brand?.name}
                    className="w-full"
                  />
                  <h2 className="text-center p-5 dark:text-white">{brand.name}</h2>
                </div>
              </button>
            ))}
          </div>
        )}
        {isModalOpen && (
          <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex justify-center w-full h-full bg-black bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-2xl">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={closeModel}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* Modal body */}
                <div className="p-4 md:p-5 space-y-4">
                  <div className="flex justify-around gap-3 items-center">
                    {specificLoading ? (
                      <div className="h-[100%] flex justify-center items-center">
                        <LoadingScreen />
                      </div>
                    ) : (
                      <>
                        <div>
                          <h2 className="text-5xl text-green-600 dark:text-yellow-400 font-bold">
                            {specificBrands?.name}
                          </h2>
                          <h2 className="text-md text-gray-600 dark:text-gray-300">
                            {specificBrands?.slug}
                          </h2>
                        </div>
                        <div className="w-[50%]">
                          <img
                            src={specificBrands?.image}
                            alt={specificBrands?.name}
                            className="w-full"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Modal footer */}
                <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-700">
                  <button
                    onClick={closeModel}
                    type="button"
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-gray-900"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
