import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../environment/environment";
import { NavLink } from "react-router-dom";
import LoadingScreen from "../shared/LoadingScreen/LoadingScreen";
export default function AllCategories() {
  //#region useEffect
  useEffect(() => {
    GetCategories();
  }, []);

  //#endregion
  //#region state hooks
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  //#endregion

  async function GetCategories() {
    setLoading(true);
    let { data } = await axios.get(`${BASE_URL}/categories`);
    setCategories(data.data);
    console.log(data);
    setLoading(false);
  }
  return (
    <>
      <>
        <div className="w-[95%] lg:w-[80%] mx-auto mt-10">
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
                    All Categories
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Categories Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loading
              ? // Skeleton Cards while loading
                Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 animate-pulse rounded-2xl h-60"
                  ></div>
                ))
              : // Actual Categories after response
                categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 overflow-hidden"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-44 object-contain"
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-1">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </>
    </>
  );
}
