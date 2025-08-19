import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { BASE_URL } from "../../environment/environment";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function OrderCheckout() {
  const { id } = useParams();

  //#region validation
  let validationSchema = Yup.object().shape({
    shippingAddress: Yup.object().shape({
      details: Yup.string().required("Details is required"),
      phone: Yup.string()
        .matches(/^(\+201|01|00201)[0-2,5][0-9]{8}$/, "Invalid phone number")
        .required("Phone is required"),

      city: Yup.string().required("City is required"),
    }),
  });
  //#endregion

  //#region formik
  let Formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: checkout,
  });
  //#endregion

  //#region methods
  async function checkout(values) {
    try {
      await toast.promise(
        axios.post(`${BASE_URL}/orders/checkout-session/${id}`, values, {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:3000",
          },
        }),
        {
          loading: "checking out...",
          success: (res) => {
            console.log(res);

            if (res.data.status === "success") {
              window.location.href = res.data.session.url;
              return <b>Successfully checked out!</b>;
            }
            throw new Error("Checkout failed");
          },
          error: (err) => {
            if (err.response?.data?.message) {
              return <b>{err.response.data.message}</b>;
            }
            return <b>Something went wrong</b>;
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  //#endregion

  return (
    <div>
      <Helmet>
        <title>Checkout</title>
        <link rel="icon" href="/LOGO.png" type="image/png" />
        <meta name="description" content="Checkout" />
      </Helmet>

      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-24">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="flex flex-col items-center justify-start pt-8 px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-xl shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Checkout
              </h1>
              <form
                onSubmit={Formik.handleSubmit}
                className="space-y-4 md:space-y-6"
              >
                {/* city */}
                <div>
                  <label
                    htmlFor="shippingAddress.city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your city
                  </label>
                  <input
                    name="shippingAddress.city"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.shippingAddress.city}
                    type="text"
                    id="city"
                    placeholder="Your city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {Formik.errors.shippingAddress?.city &&
                    Formik.touched.shippingAddress?.city && (
                      <div
                        className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {Formik.errors.shippingAddress.city}
                      </div>
                    )}
                </div>

                {/* phone */}
                <div>
                  <label
                    htmlFor="shippingAddress.phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your phone
                  </label>
                  <input
                    name="shippingAddress.phone"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.shippingAddress.phone}
                    type="text"
                    id="phone"
                    placeholder="Your phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {Formik.errors.shippingAddress?.phone &&
                    Formik.touched.shippingAddress?.phone && (
                      <div
                        className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {Formik.errors.shippingAddress.phone}
                      </div>
                    )}
                </div>

                {/* details */}
                <div>
                  <label
                    htmlFor="shippingAddress.details"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your details
                  </label>
                  <input
                    name="shippingAddress.details"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.shippingAddress.details}
                    type="text"
                    id="details"
                    placeholder="Your details"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {Formik.errors.shippingAddress?.details &&
                    Formik.touched.shippingAddress?.details && (
                      <div
                        className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {Formik.errors.shippingAddress.details}
                      </div>
                    )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!(Formik.isValid && Formik.dirty)}
                  className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center 
    transition-all duration-200 
    ${
      !(Formik.isValid && Formik.dirty) || Object.keys(Formik.errors).length > 0
        ? "bg-purple/50 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
        : "text-white bg-purple hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-purple/50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer"
    }`}
                >
                  checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
