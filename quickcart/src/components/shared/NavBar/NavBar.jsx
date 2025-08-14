import React, { useState } from 'react'
import logo from '../../../assets/images/LOGO.png'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar () {
  //#region State
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  
  //#endregion

  return (
    //
    <>
      {/*sale */}
      <div className='sale bg-purple font-montserrat text-white py-2 hidden lg:block '>
        <div className='w-full lg:max-w-[80%] mx-auto flex flex-col lg:flex-row justify-between items-center gap-2 px-4'>
          <div className='text-sm text-center lg:text-left'>
            FREE delivery & <span className='font-semibold'>40% Discount</span>{' '}
            for next 3 orders! Place your 1st order in.
          </div>

          <div className='flex flex-wrap items-center justify-center md:justify-end gap-2'>
            <span className='text-xs text-gray-200'>
              Until the end of the sale:
            </span>

            <span className='flex items-baseline gap-1'>
              <span className='text-lg font-bold'>47</span>
              <span className='text-gray-200 text-xs'>days</span>
            </span>

            <span className='flex items-baseline gap-1'>
              <span className='text-lg font-bold'>06</span>
              <span className='text-gray-200 text-xs'>hour</span>
            </span>

            <span className='flex items-baseline gap-1'>
              <span className='text-lg font-bold'>12</span>
              <span className='text-gray-200 text-xs'>min</span>
            </span>

            <span className='flex items-baseline gap-1'>
              <span className='text-lg font-bold'>12</span>
              <span className='text-gray-200 text-xs'>sec</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className='Navbar'>
        {/* first */}
        <div className='container max-w-[80%] mx-auto hidden lg:flex items-center justify-between py-3'>
          {/* About us - contact us */}
          <div className='list'>
            <ul className='text-light-text flex gap-4 text-sm'>
              <li className='cursor-pointer'>
                <a className='hover:text-black transition-all duration-200 cursor-pointer'>
                  About Us
                </a>
              </li>
              <li className='cursor-pointer'>
                <a className='hover:text-black transition-all duration-200 cursor-pointer'>
                  My account
                </a>
              </li>
              <li className='cursor-pointer'>
                <a className='hover:text-black transition-all duration-200 cursor-pointer'>
                  Wishlist
                </a>
              </li>
              <p className='border-l border-light-text'></p>
              <p>
                We deliver to you every day from{' '}
                <span className='text-orangeMain'>7:00 to 23:00</span>
              </p>
            </ul>
          </div>

          {/* Lang - currency - order track */}
          <div className='list flex gap-4 text-sm'>
            {/* Language Dropdown */}
            <div
              className='relative'
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button className='flex items-center gap-1 focus:outline-none hover:text-gray-500 transition-colors'>
                English
                <svg
                  className='w-3 h-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
              {langOpen && (
                <div className='absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-32'>
                  <ul className='py-2 text-sm text-gray-700'>
                    <li>
                      <a className='block px-4 py-2 hover:bg-gray-100'>
                        English
                      </a>
                    </li>
                    <li>
                      <a className='block px-4 py-2 hover:bg-gray-100'>
                        Arabic
                      </a>
                    </li>
                    <li>
                      <a className='block px-4 py-2 hover:bg-gray-100'>
                        French
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Currency Dropdown */}
            <div
              className='relative'
              onMouseEnter={() => setCurrencyOpen(true)}
              onMouseLeave={() => setCurrencyOpen(false)}
            >
              <button className='flex items-center gap-1 focus:outline-none hover:text-gray-500 transition-colors'>
                USD
                <svg
                  className='w-3 h-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
              {currencyOpen && (
                <div className='absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-32'>
                  <ul className='py-2 text-sm text-gray-700'>
                    <li>
                      <a className='block px-4 py-2 hover:bg-gray-100'>USD</a>
                    </li>
                    <li>
                      <a className='block px-4 py-2 hover:bg-gray-100'>EUR</a>
                    </li>
                    <li>
                      <a className='block px-4 py-2 hover:bg-gray-100'>EGP</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <a>Order track</a>
          </div>
        </div>
        <div className='border-b'></div>

        {/* second */}
        <div className='container max-w-[80%] mx-auto hidden lg:flex items-center gap-4 py-3'>
          {/* logo + location */}
          <div className='flex items-center gap-4'>
            {/* logo */}
            <a className='block'>
              <img src={logo} alt='Logo' className='w-full' />
            </a>
            {/* location */}
            <i className='fa-solid fa-location-dot text-xl'></i>
            {/* location text */}
            <div>
              <p className='text-xs text-gray-500'>Deliver to</p>
              <p className='text-sm font-semibold'>all</p>
            </div>
          </div>

          {/* search */}
          <form className='flex items-center flex-1'>
            <label htmlFor='search' className='sr-only'>
              Search
            </label>
            <div className='relative flex-1'>
              <div className='absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='search'
                className='block w-full pe-10 p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-gray-600 focus:border-gray-600'
                placeholder='Search for products, categories or brands...'
                required
              />
            </div>
          </form>

          {/* account + favorites + cart */}
          <div className='flex items-center gap-6'>
            {/* account */}
            <div>
              <p className='text-xs cursor-pointer text-gray-500 hover:text-black transition-all duration-200'>
                <NavLink to='/login'>Sign In</NavLink>
              </p>

              <p className='text-sm font-semibold cursor-pointer'>Account</p>
            </div>
            <i className='fa-solid fa-user text-2xl hover:text-gray-600 transition-all duration-200'></i>

            {/* Favorite */}
            <div className='relative'>
              <i className='fa-solid fa-heart text-2xl text-gray-900 cursor-pointer transition-all duration-300 ease-in-out hover:text-red-500 hover:scale-110'></i>
              <span
                className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'
                aria-label='Favorite count'
              >
                0
              </span>
            </div>

            {/* Cart */}
            <div className='relative'>
              <i className='fa-solid fa-cart-shopping text-2xl text-gray-900 cursor-pointer transition-all duration-300 ease-in-out hover:text-red-500 hover:scale-110'></i>
              <span
                className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'
                aria-label='Cart count'
              >
                0
              </span>
            </div>
          </div>
        </div>
        <div className='border-b'></div>

        {/* third */}
        <div className='container max-w-[80%] mx-auto hidden lg:flex items-center justify-between gap-4 py-3'>
          <ul className='flex gap-4 text-sm font-semibold'>
            <li className='cursor-pointer'>
              <NavLink to='home'>Home</NavLink>{' '}
            </li>
            <li className='cursor-pointer'>
              <NavLink to='shop'>Shop</NavLink>
            </li>
            <li className='cursor-pointer'>
              <NavLink to='fruits-vegetables'>Fruits & Vegetables</NavLink>
            </li>
            <li className='cursor-pointer'>
              <NavLink to='beverages'>Beverages</NavLink>
            </li>
            <li className='cursor-pointer'>
              <NavLink to='blog'>Blog</NavLink>
            </li>
            <li className='cursor-pointer'>
              <NavLink to='contact'>Contact</NavLink>
            </li>
          </ul>
          <ul className='flex items-center gap-4 text-sm font-semibold'>
            <li>Trending Products</li>
            <li className='text-[#DC2626]'>Almost Finished</li>
            <li>
              <button className='bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white px-[5px] py-[2px] rounded text-xs'>
                SALE
              </button>
            </li>
          </ul>
        </div>
        <div className='border-b'></div>
      </div>
      {/* Drawer init and show */}

      <div className='flex lg:hidden justify-between items-center p-3'>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-white text-gray-500 border border-gray-500 rounded-md w-10 h-10 flex items-center justify-center shadow-md transition duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400'
          type='button'
        >
          <i className='fas fa-bars text-lg'></i>
        </button>

        {/* logo */}
        <div className='flex items-center gap-4'>
          <a className='block'>
            <img src={logo} alt='Logo' className='w-full' />
          </a>
        </div>
      </div>

      {/* Drawer component */}
      <div
        className={`rounded-tr-[30px] border-r-[3px] border-gray-200 fixed top-0 left-0 z-40 h-screen p-2 overflow-y-auto bg-white w-64 dark:bg-gray-800 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className='text-gray-400 bg-transparent border border-gray-500 hover:border-gray-500 hover:bg-gray-200 hover:text-gray-900 rounded-xl text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
        >
          <svg
            className='w-3 h-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
          <span className='sr-only'>Close menu</span>
        </button>

        <div className='py-2 overflow-y-auto mt-10'>
          <ul className='space-y-1 font-medium text-sm'>
            {[
              { icon: 'fa-home', text: 'Home', Link: 'home' },
              { icon: 'fa-store', text: 'Shop', Link: 'shop' },
              { icon: 'fa-apple-alt', text: 'Fruits & Vegetables' },
              { icon: 'fa-coffee', text: 'Beverages' },
              { icon: 'fa-blog', text: 'Blog' },
              { icon: 'fa-phone', text: 'Contact' },
              { icon: 'fa-info-circle', text: 'About Us' },
              { icon: 'fa-user', text: 'My Account' },
              { icon: 'fa-heart', text: 'Wishlist' },
              { icon: 'fa-shopping-cart', text: 'Cart' },
              { icon: 'fa-globe', text: 'English' }
            ].map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.Link}
                  className='flex items-center  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition'
                >
                  <i
                    className={`fas ${item.icon} fa-lg text-gray-500 dark:text-gray-400 mr-2`}
                  ></i>
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
