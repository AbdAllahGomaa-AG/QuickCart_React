import React from 'react'
import image from '../../assets/images/cover/elements01.png'


export default function Slider() {
  return <>
  <div className=' image relative w-full h-screen flex items-center'>
  <img src={image} alt='' className='w-full h-full object-cover' />

  <div className='absolute px-4 sm:px-8 lg:px-24 max-w-[90%] sm:max-w-[70%] text-white'>
    <p className='text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#39245F] drop-shadow-md'>
      Shopping with us for <br />
      better quality and the <br />
      best price
    </p>

    <p className='text-sm sm:text-lg text-black mt-4 drop-shadow-sm'>
      We have prepared special discounts for you on grocery products.
      <br />
      Don't miss these opportunities...
    </p>

    <div className='flex flex-col sm:flex-row gap-6 mt-8 sm:items-center'>
      <button className='bg-[#39245F] hover:bg-[#2b1d4a] transition px-8 py-3 rounded-md text-sm sm:text-base font-medium'>
        Shop Now
      </button>

      <div className='flex flex-col gap-1  px-4 py-2 '>
        <div className='flex gap-2 items-center'>
          <p className='text-lg sm:text-xl font-bold leading-tight text-[#DC2626]'>
            $21.67
          </p>
          <p className='text-lg sm:text-xl font-semibold leading-tight line-through text-gray-800'>
            $26.67
          </p>
        </div>
        <p className='text-xs sm:text-sm text-gray-900 font-medium'>
          Don't miss this limited time offer.
        </p>
      </div>
    </div>
  </div>
</div>

  </>
}
