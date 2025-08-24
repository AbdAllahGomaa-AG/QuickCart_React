import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../environment/environment";
import axios from "axios";
import CartAddServices from "../../Core/services/Cartaddservices";
import { CartContext } from "../../context/CartContextProvider";
import LoadingScreen from "../shared/LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const { setCart } = useContext(CartContext);
  //#region useState
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  //#endregion

  //#region useEffect
  useEffect(() => {
    GetWishlist();
  }, []);

  // Add this useEffect to monitor wishlist changes
  useEffect(() => {
    console.log("Wishlist updated:", wishlist);
  }, [wishlist]);

  //#endregion

  //#region methods
  async function GetWishlist() {
    setLoading(true);
    try {
      let { data } = await axios.get(`${BASE_URL}/wishlist`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setWishlist(data.data);
      setLoading(false);
      console.log("Data from API:", data.data);
      console.log("Current wishlist state:", wishlist);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  async function removeProductFromWishlist(id) {
    setLoading(true);
    try {
      let { data } = await axios.delete(`${BASE_URL}/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      await GetWishlist();
      console.log("Data from API:", data);
      // setWishlist(data.data);
      console.log("Current wishlist state:", wishlist); // This will show old state
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  //#endregion

  return (
    <>
    <Helmet>
      <title>Wishlist</title>
    </Helmet>
      {loading ? (
        <LoadingScreen />
      ) : (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 ">
          <div className="mx-auto max-w-screen-xl px-2 2xl:px-0">
            {/* Cart Body */}
            <div className="sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              {/* Products Section */}
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Wishlist ({wishlist.length})
                </h2>
                {/* Sample Product */}
                <div className="space-y-6 gap-4 mt-4">
                  {wishlist.map((item) => {
                    return (
                      <div className="border border-gray-200 shadow-lg rounded-xl bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          {/* Image */}
                          <a className="shrink-0 md:order-1">
                            <img
                              className="w-32 dark:hidden"
                              src={item.imageCover}
                              alt="Product Name"
                            />
                          </a>

                          {/* Counter */}
                          <label htmlFor="counter-input" className="sr-only">
                            Choose quantity:
                          </label>
                          <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center"></div>
                          </div>

                          {/* Product Info */}
                          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                              {item.title}
                              <p className="text-sm text-gray-500 mt-2">
                                price: {item.price} $
                              </p>
                            </a>

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() =>
                                  CartAddServices(item._id, setCart)
                                }
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
                                Add to cart
                              </button>

                              <button
                                onClick={() =>
                                  removeProductFromWishlist(item._id)
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
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
