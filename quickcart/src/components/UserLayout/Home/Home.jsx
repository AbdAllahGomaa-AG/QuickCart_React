import React, { useEffect, useState } from "react";
import Slider from "../../Slider/Slider";
import Categories from "../../categories/Categories.jsx";
import Product from "../../Product/Product";
import axios from "axios";
import { BASE_URL } from "../../../environment/environment.jsx";
import { NavLink } from "react-router-dom";
import Brands from "../../Brands/Brands.jsx";
import Image from "../../../assets/images/Frame 600 (1).png";

export default function Home() {
  //#region  Products
  const [Products, setProducts] = useState([]);
  async function GetProducts() {
    try {
      let { data } = await axios.get(`${BASE_URL}/products`);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GetProducts();
  }, []);
  //#endregion

  return (
    <>
      <Slider />
      <Categories />
      {/* Products */}
      <div className="lg:max-w-[80%] w-[80%] mx-auto mt-10">
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center py-6">
          <h2 className="text-xl md:text-2xl font-bold flex flex-wrap items-center gap-3 mt-6 border-l-8 pl-2  border-purple ">
            Top Products
            <span className="text-gray-500 text-sm ml-2 whitespace-nowrap md:block hidden">
              New products with updated stocks.
            </span>
          </h2>
          <NavLink to="/all-product">
            <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium shadow hover:bg-gray-800 transition">
              View All <i className="fas fa-chevron-right ml-2"></i>
            </button>
          </NavLink>
        </div>
        <div className="grid grid-cols-1 gap-4  lg:grid-cols-4 md:grid-cols-2  sm:grid-cols-2  ">
          {Products.slice()
            .reverse()
            .slice(0, 8)
            .map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </div>
      </div>
      <Brands limit={4} />
      {/* Image */}
      <div className="lg:max-w-[80%] w-[80%] hidden md:block mx-auto mt-10 p-6">
        <img src={Image} alt="Frame 600 (1)" loading="lazy" />
      </div>
      {/* icon */}
      <div className="lg:max-w-[80%] w-[80%] hidden md:block mx-auto mt-10 p-6">
        <div className="flex justify-around">
          <div className="flex items-center flex-col gap-2">
            <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-full hover:bg-gray-800 transition mb-2">
              <i className="fas fa-truck text-white text-xl"></i>
            </div>
            <span className="text-lg font-bold">FREE AND FAST DELIVERY</span>
            <p className="text-sm text-gray-500">
              Free shipping on all orders over $100
            </p>
          </div>
          <div className="flex items-center flex-col gap-2">
            <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-full hover:bg-gray-800 transition mb-2">
              <i className="fas fa-shield-alt text-white text-xl"></i>
            </div>
            <span className="text-lg font-bold">24/7 CUSTOMER SERVICE</span>
            <p className="text-sm text-gray-500">
              Friendly 24/7 customer support
            </p>
          </div>

          <div className="flex items-center flex-col gap-2">
            <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-full hover:bg-gray-800 transition mb-2">
              <i className="fas fa-headphones-alt text-white text-xl"></i>
            </div>
            <span className="text-lg font-bold">MONEY BACK GUARANTEE</span>
            <p className="text-sm text-gray-500">
              We rerun money within 30 days
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
