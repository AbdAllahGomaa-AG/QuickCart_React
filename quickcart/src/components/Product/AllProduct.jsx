import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../../environment/environment";
import Product from "./Product";
import LoadingScreen from "../shared/LoadingScreen/LoadingScreen";
import { NavLink } from "react-router-dom";

export default function AllProduct() {
  //#region  Products
  const [Products, setProducts] = useState([]);
  async function GetProducts() {
    try {
      let { data } = await axios.get(`${BASE_URL}/products`);
      setProducts(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    GetProducts();
  }, []);
  //#endregion
  //#region loading
  const [loading, setLoading] = useState(true);
  //#endregion
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="lg:max-w-[80%] w-[80%] mx-auto mt-4">
          {/* breadcrumb */}
          <nav className="flex mb-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse p-4">
              <li className="inline-flex items-center">
                <NavLink
                  to="/"
                  className="inline-flex items-center text-xl font-bold text-gray-700 hover:text-purple dark:text-gray-400 dark:hover:text-white"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-xl font-bold text-gray-700 hover:text-purple md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    All Products
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          {/*  */}
          <div className="grid grid-cols-1 gap-4  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  ">
            {Products.slice()
              .reverse()
              .map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
