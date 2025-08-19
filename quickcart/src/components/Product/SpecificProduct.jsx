import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../environment/environment";
import { useState } from "react";
import LoadingScreen from "../shared/LoadingScreen/LoadingScreen";
import Slider from "react-slick";
import CartAddServices from "../../Core/services/Cartaddservices";
import { Toaster } from "react-hot-toast";

export default function SpecificProduct() {
  //#region useEffect
  useEffect(() => {
    GetSpecificProduct();
  }, []);
  //#endregion
  //#region useState
  const [productDetail, setProductDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  //#endregion

  //#region useParams
  let { id } = useParams();
  //#endregion

  //#region Slider
  var settings = {
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  //#endregion

  //#region methods
  async function GetSpecificProduct() {
    try {
      setLoading(true);
      let { data } = await axios.get(`${BASE_URL}/products/${id}`);
      setProductDetail(data.data);
      console.log(productDetail);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  //#endregion

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        
        <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
          <Toaster position="top-right" reverseOrder={false} />
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              {/* image */}
              <div className="   p-4 ">
                <Slider {...settings}>
                  {productDetail?.images?.map((image) => {
                    return (
                      <img
                        className="w-full h-96 object-contain rounded-lg "
                        src={image}
                        alt=""
                      />
                    );
                  })}
                </Slider>
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {productDetail?.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                    {productDetail?.price}$
                  </p>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rate) => {
                        return (
                          <svg
                            className={
                              rate <= productDetail?.ratingsAverage
                                ? "w-5 h-5 text-yellow-300"
                                : "w-5 h-5 text-gray-300"
                            }
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                          </svg>
                        );
                      })}
                    </div>

                    <p className="text-sm font-medium leading-none text-gray-700 dark:text-gray-400">
                      {productDetail?.ratingsAverage}
                    </p>
                  </div>
                </div>
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <a
                    href="#"
                    title=""
                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    role="button"
                  >
                    <svg
                      className="w-5 h-5 -ms-2 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                      />
                    </svg>
                    Add to favorites
                  </a>

                  <a
                    onClick={() => CartAddServices(productDetail._id)}
                    title=""
                    className="text-white mt-4 sm:mt-0 bg-purple hover:bg-purple/90 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                    role="button"
                  >
                    <svg
                      className="w-5 h-5 -ms-2 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                      />
                    </svg>
                    Add to cart
                  </a>
                </div>
                <hr className="my-2 md:my-8 border-gray-400 dark:border-gray-800" />
                <p className="text-gray-500 dark:text-gray-400">
                  {productDetail?.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
