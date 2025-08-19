import React from "react";
import { NavLink } from "react-router-dom";
import CartAddServices from "../../Core/services/Cartaddservices";
import { Toaster } from "react-hot-toast";

export default function Product({ product }) {
  return (
    <>
    
      <div className="max-w-2xl mx-auto mt-6">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="bg-white shadow-2xl px-2 border border-gray-300 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 hover:scale-[1.01] transition-all duration-200">
          <NavLink to={`/specific-product/${product._id}`} >
            <img
              className="rounded-t-lg p-8 cursor-pointer"
              src={product.imageCover}
              alt="product"
            />
          </NavLink>
          <div className="px-2 pb-5">
            <NavLink to={`/specific-product/${product._id}`} className="cursor-pointer">
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">
                {product.title}
              </h3>
            </NavLink>
            <p className="text-gray-600 text-sm line-clamp-1">
              {product.description}
            </p>
            <div className="flex items-center mt-2.5 mb-5">
              {[1, 2, 3, 4, 5].map((rate) => {
                return (
                  <svg
                    className={
                      rate <= product.ratingsAverage
                        ? "w-5 h-5 text-yellow-300"
                        : "w-5 h-5 text-gray-300"
                    }
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 
       0l1.286 3.974a1 1 0 00.95.69h4.18c.969 
       0 1.371 1.24.588 1.81l-3.385 2.46a1 1 
       0 00-.364 1.118l1.287 3.974c.3.921-.755 
       1.688-1.54 1.118l-3.385-2.46a1 1 
       0 00-1.175 0l-3.385 2.46c-.784.57-1.838
       -.197-1.539-1.118l1.287-3.974a1 1 
       0 00-.364-1.118l-3.385-2.46c-.783-.57
       -.38-1.81.588-1.81h4.18a1 1 
       0 00.95-.69l1.286-3.974z"
                    />
                  </svg>
                );
              })}

              <span className="bg-purple/90 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                {product.ratingsAverage}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {product.price}$
              </span>
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full " onClick={() => CartAddServices(product._id)}>
                  <i className="fa-solid fa-cart-plus text-black dark:text-white text-lg hover:text-red-600 transition-all duration-200"></i>
                </button>
                <button className="p-2 rounded-full ">
                  <i className="fa-solid fa-heart text-black dark:text-white text-lg hover:text-red-600 transition-all duration-200"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
