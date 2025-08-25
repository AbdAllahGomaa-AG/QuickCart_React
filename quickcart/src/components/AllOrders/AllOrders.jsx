import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AllOrders () {
  return (
    <>
      <section className='py-20 relative flex items-center justify-center bg-gradient-to-r min-h-s  text-black'>
        <div className='max-w-md w-full  text-center bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 animate-fade-in-up'>
          {/* Success Icon */}
          <div className='flex items-center justify-center mb-6'>
            <div className='bg-white text-purple rounded-full p-4 shadow-lg animate-bounce'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
          </div>

          {/* Main Text */}
          <h2 className='text-2xl font-bold mb-3'>🎉 Thanks for your order!</h2>
          <p className=' text-sm text-black'>
            We’ll send a confirmation email once your order ships. Get ready,
            it’s on the way 🚚
          </p>

          {/* Button */}
          <div className='mt-6'>
            <NavLink
              to='/'
              className='inline-block bg-white text-purple/80 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition'
            >
              Back to home
            </NavLink>
          </div>
        </div>
      </section>
    </>
  )
}
