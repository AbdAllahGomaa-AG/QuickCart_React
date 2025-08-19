import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../environment/environment";
import LoadingScreen from "../shared/LoadingScreen/LoadingScreen";
import toast, { Toaster } from "react-hot-toast";
import image from "../../assets/images/shopping-trolley.png";
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Cart() {
  //#region  useState
  const [Products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [loadingProductInc, setLoadingProductInc] = useState(false);
  const [loadingProductDec, setLoadingProductDec] = useState(false);
  //#endregion

  //#region useEffect
  useEffect(() => {
    GetProducts();
  }, []);
  useEffect(() => {
    console.log(Products);
  }, [Products]);
  useEffect(() => {}, [totalCartPrice]);
  //#endregion

  //#region methods
  async function GetProducts() {
    setLoading(true);
    try {
      let { data } = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLoading(false);
      if (data.data.products.length > 0) {
        console.log("API Data:", data);
        setProducts(data.data.products);
        setCart(data);
        setTotalCartPrice(data.data.totalCartPrice);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  //
  async function removeProductFromCart(id) {
    setLoadingProductDec(true);
    await toast.promise(
      axios.delete(`${BASE_URL}/cart/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
      {
        loading: "Removing from cart...",
        success: (res) => {
          console.log(res.data);
          setLoading(false);
          setProducts(res.data.data.products);
          setTotalCartPrice(res.data.data.totalCartPrice);
          if (res.data.status === "success") {
            return res.data.status;
          }
          console.log(res);
        },
        error: (err) => {
          setLoading(false);
          console.log(err);
        },
      }
    );
  }

  //
  async function updateCartItem(id, count, type) {
    if (type === "inc") {
      setLoadingProductInc(true);
    } else {
      setLoadingProductDec(true);
    }
    await toast.promise(
      axios.put(
        `${BASE_URL}/cart/${id}`,
        { count: count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      ),
      {
        loading: "Updating cart...",
        success: (res) => {
          console.log(res.data);
          setLoadingProductInc(false);
          setLoadingProductDec(false);
          setProducts(res.data.data.products);
          setTotalCartPrice(res.data.data.totalCartPrice);
          if (res.data.status === "success") {
            return res.data.status;
          }
          console.log(res);
        },
        error: (err) => {
          setLoadingProductInc(false);
          setLoadingProductDec(false);
          console.log(err);
        },
      }
    );
  }
  async function clearCart() {
    await toast.promise(
      axios.delete(`${BASE_URL}/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
      {
        loading: "Clearing cart...",
        success: (res) => {
          console.log(res.data);
          setLoading(false);
          setProducts([]);
          setTotalCartPrice(0);
          if (res.data.status === "success") {
            return res.data.status;
          }
          console.log(res);
        },
        error: (err) => {
          setLoading(false);
          console.log(err);
        },
      }
    );
  }

  //#endregion

  return (
    <>
    <Helmet>
        <title>Cart</title>
        <link rel="icon" href="/LOGO.png" type="image/png" />
        <meta name="description" content="Cart" />
      </Helmet>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <Toaster position="top-right" reverseOrder={false} />
          {/* Cart Header */}
          <div className="flex items-center justify-start">
            <div className="flex items-center justify-between pb-3 mb-4">
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                🛒 Shopping Cart
              </h2>

              {/* Delete All Button */}
              <button onClick={() => clearCart()} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition ml-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                  />
                </svg>
                Clear Cart
              </button>
            </div>
          </div>

          {/* Cart Body */}
          {loading ? (
            <LoadingScreen />
          ) : (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              {/* Products Section */}
              {Products.length > 0 ? (
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl gap-4">
                  {Products.map((product) => (
                    <div key={product._id} className="space-y-6 gap-4 mt-4">
                      <div className="border border-gray-200 shadow-lg rounded-xl bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          {/* Image */}
                          <a className="shrink-0 md:order-1">
                            <img
                              className="w-32 dark:hidden"
                              src={product.product.imageCover}
                              alt={product.product.title}
                            />
                            <img
                              className="hidden h-20 w-20 dark:block"
                              src={product.product.imageCover}
                              alt={product.product.title}
                            />
                          </a>

                          {/* Counter */}
                          <label htmlFor="counter-input" className="sr-only">
                            Choose quantity:
                          </label>
                          <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                              {/* Decrement */}
                              <button
                                disabled={
                                  product.count === 1 || loadingProductDec
                                }
                                onClick={() =>
                                  updateCartItem(
                                    product.product._id,
                                    product.count - 1,
                                    "dec"
                                  )
                                }
                                type="button"
                                id="decrement-button"
                                data-input-counter-decrement="counter-input"
                                className=" cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                              >
                                {loadingProductDec[product.product._id] ? (
                                  <i className="fas fa-spinner animate-spin text-xs"></i>
                                ) : (
                                  <svg
                                    className="h-2.5 w-2.5 text-gray-900 dark:text-white "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M1 1h16"
                                    />
                                  </svg>
                                )}
                              </button>
                              {/* Counter */}
                              <input
                                type="text"
                                id="counter-input"
                                data-input-counter
                                className="w-8 px-1 py-0.5 m-2 border border-gray-300 rounded bg-transparent text-center text-xs font-medium text-gray-900 focus:outline-none"
                                value={product.count}
                              />

                              {/* Increment */}
                              <button
                                disabled={loadingProductInc}
                                onClick={() =>
                                  updateCartItem(
                                    product.product._id,
                                    product.count + 1,
                                    "inc"
                                  )
                                }
                                type="button"
                                id="increment-button"
                                data-input-counter-increment="counter-input"
                                className=" cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                              >
                                {loadingProductInc[product.product._id] ? (
                                  <i className="fas fa-spinner animate-spin text-xs "></i>
                                ) : (
                                  <svg
                                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M9 1v16M1 9h16"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>

                            <div className="text-end md:order-4 md:w-32">
                              <p className="text-base font-bold text-gray-900 dark:text-white">
                                {product.price * product.count} $
                              </p>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                              {product.product.title}
                              <p className="text-sm text-gray-500 mt-2">
                                price: {product.price} $
                              </p>
                            </a>

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                              >
                                <svg
                                  className="me-1.5 h-5 w-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
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
                                Add to Favorites
                              </button>

                              <button
                                onClick={() =>
                                  removeProductFromCart(product.product._id)
                                }
                                type="button"
                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                              >
                                <svg
                                  className="me-1.5 h-5 w-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                  />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl gap-4">
                  <div className="text-center text-gray-500 flex flex-col items-center justify-center">
                    <img
                      src={image}
                      alt="No products in cart"
                      className="w-64 h-64"
                    />
                    <p className="text-lg font-montserrat font-semibold mt-4 text-center ml-10">
                      No products in cart
                    </p>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 border border-gray-200 shadow-lg rounded-xl bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order summary
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Original price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {totalCartPrice} $
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Store Pickup
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          $0
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Tax
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          $0
                        </dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {totalCartPrice} $
                      </dd>
                    </dl>
                  </div>

                  <Link
                    to={`/checkout/${cart.cartId}`}
                    className="flex w-full items-center justify-center rounded-lg bg-purple px-5 py-2.5 text-sm font-medium text-white hover:bg-purple/80 "
                  >
                    Proceed to Checkout
                  </Link>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      or
                    </span>
                    <NavLink
                      to="/shop"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                    >
                      Continue Shopping
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
