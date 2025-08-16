import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../environment/environment'

export default function Categories () {
  //#region lifecycle hooks
  useEffect(() => {
    GetCategories()
  }, [])
  //#endregion

  //#region state hooks
  const [categories, setCategories] = useState([])
  //#endregion

  async function GetCategories () {
    let { data } = await axios.get(`${BASE_URL}/categories`)
    setCategories(data.data)
    console.log(data)

    // Fetch categories from an API or database
  }

  return (
    <>
      <div className=' lg:max-w-[80%] w-[80%] mx-auto mt-4'>
        <div className='flex flex-wrap sm:flex-nowrap justify-between items-center py-6'>
          <h2 className='text-lg font-semibold flex items-center '>
            Top Categories
            <span className='text-gray-500 text-xs ml-2 whitespace-nowrap md:block hidden'>
              New products with updated stocks.
            </span>
          </h2>
          <button className='bg-white flex justify-center items-center text-gray-800 border border-gray-300 px-3 py-2 rounded-full text-xs hover:bg-gray-100 transition mt-2 sm:mt-0'>
            View All <i className='fas fa-chevron-right ml-1'></i>
          </button>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-4'>
          {categories.slice(0, 9).map(category => (
            <div
              key={category.id}
              className='bg-white p-4 rounded-md shadow-lg border border-gray-300'
            >
              <img
                src={category.image}
                alt={category.name}
                className='w-full h-36 sm:h-32 object-cover mb-2 rounded'
              />
              <h3 className='text-sm font-semibold mb-2 text-center'>
                {category.name.slice(0, 10)}
              </h3>
              <p className='text-gray-600 text-xs sm:text-sm'>
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
