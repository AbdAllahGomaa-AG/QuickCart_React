import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../environment/environment";

export default function Brands({ limit }) {
  //#region state hooks
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  //#endregion

  //#region lifecycle hooks
  useEffect(() => {
    GetCategories();
  }, []);
  //#endregion

  //#region functions
  async function GetCategories() {
    try {
      let { data } = await axios.get(`${BASE_URL}/brands`);
      setCategories(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  //#endregion

  const displayedBrands = limit ? categories.slice(0, limit) : categories;

  return (
    <div className="w-[95%] lg:w-[80%] mx-auto mt-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        {limit > 0 ? (
          <>
            <h2 className="text-xl md:text-2xl font-bold flex flex-wrap items-center gap-3 mt-6 border-l-8 pl-2  border-purple">
              Top brands
              <span className="text-gray-500 text-sm ml-2 whitespace-nowrap md:block hidden">
                New brands with updated stocks.
              </span>
            </h2>
            <NavLink to="/brands">
              <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium shadow hover:bg-gray-800 transition">
                View All <i className="fas fa-chevron-right ml-2"></i>
              </button>
            </NavLink>
          </>
        ) : (
          <>
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
                      Brands
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden animate-pulse"
              >
                <div className="w-full h-44 bg-gray-200"></div>
                <div className="p-4 text-center">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
                </div>
              </div>
            ))
          : displayedBrands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 overflow-hidden"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-36 object-contain"
                  loading="lazy"
                />
                <div className="p-4 text-center">
                  <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-1">
                    {brand.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {brand.description}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
