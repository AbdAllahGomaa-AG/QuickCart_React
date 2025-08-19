import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../../environment/environment";
import Product from "./Product";
import LoadingScreen from "../shared/LoadingScreen/LoadingScreen";

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
    {loading ? <LoadingScreen /> : (
      <div className="lg:max-w-[80%] w-[80%] mx-auto mt-4">
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center py-6">
          <h2 className="text-lg font-semibold flex items-center ">
            All Products
            <span className="text-gray-500 text-xs ml-2 whitespace-nowrap md:block hidden">
              All products with updated stocks.
            </span>
          </h2>

        </div>
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
