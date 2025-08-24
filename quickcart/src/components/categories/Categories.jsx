import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../environment/environment";
import { NavLink } from "react-router-dom";

export default function Categories() {
  //#region state hooks
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  //#endregion

  //#region lifecycle hooks
  useEffect(() => {
    GetCategories();
  }, []);
  //#endregion

  async function GetCategories() {
    try {
      let { data } = await axios.get(`${BASE_URL}/categories`);
      setCategories(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-[95%] lg:w-[80%] mx-auto mt-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold flex flex-wrap items-center gap-3 border-l-8 pl-2  border-purple">
            Top Categories
            <span className="text-gray-500 text-xs md:text-sm whitespace-nowrap hidden md:inline">
              New products with updated stocks.
            </span>
          </h2>
          <NavLink to="/categories">
            <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium shadow hover:bg-gray-800 transition">
              View All <i className="fas fa-chevron-right ml-2"></i>
            </button>
          </NavLink>
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
            : categories.slice(0, 4).map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 overflow-hidden"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-44 object-contain"
                    loading="lazy"
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
  );
}
