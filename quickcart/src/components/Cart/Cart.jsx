import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../environment/environment'
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen'
import toast, { Toaster } from 'react-hot-toast'
import image from '../../assets/images/shopping-trolley.png'
import { Link, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Cart () {
  //#region  useState
  const [Products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [loadingProductInc, setLoadingProductInc] = useState(false)
  const [loadingProductDec, setLoadingProductDec] = useState(false)
  //#endregion

  //#region useEffect
  useEffect(() => {
    GetProducts()
  }, [])
  useEffect(() => {
    console.log(Products)
  }, [Products])
  useEffect(() => {}, [totalCartPrice])
  //#endregion

  //#region methods
  async function GetProducts () {
    setLoading(true)
    try {
      let { data } = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      setLoading(false)
      if (data.data.products.length > 0) {
        console.log('API Data:', data)
        setProducts(data.data.products)
        setCart(data)
        setTotalCartPrice(data.data.totalCartPrice)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  //
  async function removeProductFromCart (id) {
    setLoadingProductDec(true)
    await toast.promise(
      axios.delete(`${BASE_URL}/cart/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      }),
      {
        loading: 'Removing from cart...',
        success: res => {
          console.log(res.data)
          setLoading(false)
          setProducts(res.data.data.products)
          setTotalCartPrice(res.data.data.totalCartPrice)
          if (res.data.status === 'success') {
            return res.data.status
          }
          console.log(res)
        },
        error: err => {
          setLoading(false)
          console.log(err)
        }
      }
    )
  }

  //
  async function updateCartItem (id, count, type) {
    if (type === 'inc') {
      setLoadingProductInc(true)
    } else {
      setLoadingProductDec(true)
    }
    await toast.promise(
      axios.put(
        `${BASE_URL}/cart/${id}`,
        { count: count },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      ),
      {
        loading: 'Updating cart...',
        success: res => {
          console.log(res.data)
          setLoadingProductInc(false)
          setLoadingProductDec(false)
          setProducts(res.data.data.products)
          setTotalCartPrice(res.data.data.totalCartPrice)
          if (res.data.status === 'success') {
            return res.data.status
          }
          console.log(res)
        },
        error: err => {
          setLoadingProductInc(false)
          setLoadingProductDec(false)
          console.log(err)
        }
      }
    )
  }
  async function clearCart () {
    await toast.promise(
      axios.delete(`${BASE_URL}/cart`, {
        headers: {
          token: localStorage.getItem('token')
        }
      }),
      {
        loading: 'Clearing cart...',
        success: res => {
          console.log(res.data)
          setLoading(false)
          setProducts([])
          setTotalCartPrice(0)
          if (res.data.status === 'success') {
            return res.data.status
          }
          console.log(res)
        },
        error: err => {
          setLoading(false)
          console.log(err)
        }
      }
    )
  }

  //#endregion

  return (
    <>
      <Helmet>
        <title>Cart</title>
        <link rel='icon' href='/LOGO.png' type='image/png' />
        <meta name='description' content='Cart' />
      </Helmet>
      <section className='bg-white py-8 antialiased dark:bg-gray-900 md:py-16'>
        <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
          <Toaster position='top-right' reverseOrder={false} />

          {/* Cart Header */}
          <div className='flex flex-wrap items-center justify-between border-b border-gray-200 pb-4 mb-6 dark:border-gray-700'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2'>
               Shopping Cart
              <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                ({Products.length} items)
              </span>
            </h2>

            {Products.length > 0 && (
              <button
                onClick={() => clearCart()}
                className='flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4'
                  />
                </svg>
                Clear Cart
              </button>
            )}
          </div>

          {/* Cart Body */}
          {loading ? (
            <LoadingScreen />
          ) : (
            <div className='mt-6 sm:mt-8 md:gap-8 lg:flex lg:items-start xl:gap-12'>
              {/* Products Section */}
              {Products.length > 0 ? (
                <div className='w-full lg:max-w-3xl xl:max-w-4xl space-y-6'>
                  {Products.map(product => (
                    <div
                      key={product._id}
                      className='flex flex-col md:flex-row items-center md:items-start justify-between border border-gray-200 shadow-md rounded-xl bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:p-6 gap-6'
                    >
                      {/* Image */}
                      <div className='shrink-0'>
                        <img
                          className='w-28 h-28 object-cover rounded-md'
                          src={product.product.imageCover}
                          alt={product.product.title}
                        />
                      </div>

                      {/* Product Info */}
                      <div className='flex-1 min-w-0'>
                        <h3 className='text-base font-semibold text-gray-900 dark:text-white'>
                          {product.product.title}
                        </h3>
                        <p className='text-sm text-gray-500 mt-1'>
                          Price: {product.price} $
                        </p>

                        {/* Actions */}
                        <div className='flex flex-wrap items-center gap-4 mt-3'>
                          <button
                            type='button'
                            className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white'
                          >
                            <i className='fas fa-heart mr-1'></i> Add to
                            Favorites
                          </button>
                          <button
                            onClick={() =>
                              removeProductFromCart(product.product._id)
                            }
                            type='button'
                            className='inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500'
                          >
                            <i className='fas fa-trash-alt mr-1'></i> Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className='flex flex-col items-center md:items-end gap-3'>
                        {/* Counter */}
                        <div className='flex items-center'>
                          <button
                            disabled={product.count === 1 || loadingProductDec}
                            onClick={() =>
                              updateCartItem(
                                product.product._id,
                                product.count - 1,
                                'dec'
                              )
                            }
                            className='h-6 w-6 flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                          >
                            {loadingProductDec[product.product._id] ? (
                              <i className='fas fa-spinner animate-spin text-xs'></i>
                            ) : (
                              '-'
                            )}
                          </button>
                          <span className='w-8 text-center text-sm font-medium mx-2'>
                            {product.count}
                          </span>
                          <button
                            disabled={loadingProductInc}
                            onClick={() =>
                              updateCartItem(
                                product.product._id,
                                product.count + 1,
                                'inc'
                              )
                            }
                            className='h-6 w-6 flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                          >
                            {loadingProductInc[product.product._id] ? (
                              <i className='fas fa-spinner animate-spin text-xs'></i>
                            ) : (
                              '+'
                            )}
                          </button>
                        </div>

                        {/* Price */}
                        <p className='text-base font-bold text-gray-900 dark:text-white'>
                          {product.price * product.count} $
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='w-full lg:max-w-3xl xl:max-w-4xl flex flex-col items-center justify-center text-center gap-4'>
                  <img
                    src={image}
                    alt='No products in cart'
                    className='w-60 h-60 object-contain'
                  />
                  <p className='text-lg font-semibold text-gray-600 dark:text-gray-300'>
                    No products in cart
                  </p>
                  <NavLink
                    to='/'
                    className='text-purple font-medium hover:underline'
                  >
                    Continue Shopping
                  </NavLink>
                </div>
              )}

              {/* Order Summary */}
              <div className='mt-8 lg:mt-0 lg:w-96 w-full'>
                <div className='space-y-4 border border-gray-200 shadow-lg rounded-xl bg-white p-6 dark:border-gray-700 dark:bg-gray-800'>
                  <p className='text-xl font-semibold text-gray-900 dark:text-white'>
                    Order Summary
                  </p>

                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-gray-500 dark:text-gray-400'>
                        Subtotal
                      </span>
                      <span className='font-medium text-gray-900 dark:text-white'>
                        {totalCartPrice} $
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-500 dark:text-gray-400'>
                        Tax
                      </span>
                      <span className='font-medium text-gray-900 dark:text-white'>
                        $0
                      </span>
                    </div>
                    <div className='flex justify-between border-t pt-2'>
                      <span className='font-bold text-gray-900 dark:text-white'>
                        Total
                      </span>
                      <span className='font-bold text-gray-900 dark:text-white'>
                        {totalCartPrice} $
                      </span>
                    </div>
                  </div>

                  <Link
                    to={
                      Products.length === 0 ? '#' : `/checkout/${cart.cartId}`
                    }
                    onClick={e => {
                      if (Products.length === 0) {
                        e.preventDefault() 
                      }
                    }}
                    className={`block w-full text-center rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-purple/80 transition ${
                      Products.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple'
                    }`}
                  >
                    Proceed to Checkout
                  </Link>

                  <div className='flex items-center justify-center gap-2 text-sm'>
                    <span className='text-gray-500 dark:text-gray-400'>or</span>
                    <NavLink
                      to='/shop'
                      className='text-purple font-medium hover:underline'
                    >
                      Continue Shopping
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
