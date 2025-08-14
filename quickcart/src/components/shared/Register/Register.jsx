import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register () {

  
  const [IsLogin, setIsLogin] = useState(false)
  
  let navigate = useNavigate()
  //#region  From register
  async function Register (values) {
    try {
      // call api
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      )
      console.log(data)
      if (data.message == 'success') {
        navigate('/home')
        localStorage.setItem('token', data.token)
        setIsLogin(true)
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message)
      } else {
        console.log('Something went wrong:', error.message)
      }
    }

    console.log(values)
  }
  //    validation
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'min length is 3')
      .max(50, 'max length is 50')
      .required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Password must be at least 8 characters long and contain at least one letter and one number'
      )
      .required('Password is required'),
    rePassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
    phone: Yup.string()
      .matches(
        /^(002)?01[0125][0-9]{8}$/,
        'Phone number must be between 10 and 15 digits'
      )
      .required('Phone is required')
  })
  // formik
  let Formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: validationSchema,
    onSubmit: Register
  })
  //#endregion`

  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900 min-h-screen py-10'>
        <div className='flex flex-col items-center justify-start pt-8 px-6 py-8 mx-auto lg:py-0'>
          <div className='w-full bg-white rounded-xl shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Create an account
              </h1>
              <form
                onSubmit={Formik.handleSubmit}
                className='space-y-4 md:space-y-6'
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your Name
                  </label>
                  <input
                    name='name'
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.name}
                    type='text'
                    id='name'
                    placeholder='John Doe'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  />
                  {/* error name */}
                  {Formik.errors.name && Formik.touched.name && (
                    <div
                      className='p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
                      role='alert'
                    >
                      {Formik.errors.name}
                    </div>
                  )}
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your Email
                  </label>
                  <input
                    name='email'
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.email}
                    type='email'
                    id='email'
                    placeholder='name@company.com'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  />
                  {/* error email */}
                  {Formik.errors.email && Formik.touched.email && (
                    <div
                      className='p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
                      role='alert'
                    >
                      {Formik.errors.email}
                    </div>
                  )}
                </div>
                {/* Password */}
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Password
                  </label>
                  <input
                    name='password'
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.password}
                    type='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  />
                  {/* error password */}
                  {Formik.errors.password && Formik.touched.password && (
                    <div
                      className='p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
                      role='alert'
                    >
                      {Formik.errors.password}
                    </div>
                  )}
                </div>
                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor='rePassword'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Confirm Password
                  </label>
                  <input
                    name='rePassword'
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.rePassword}
                    type='password'
                    id='rePassword'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  />
                  {/* error rePassword */}
                  {Formik.errors.rePassword && Formik.touched.rePassword && (
                    <div
                      className='p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
                      role='alert'
                    >
                      {Formik.errors.rePassword}
                    </div>
                  )}
                </div>
                {/* Phone */}
                <div>
                  <label
                    htmlFor='phone'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Phone
                  </label>
                  <input
                    name='phone'
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.phone}
                    type='text'
                    id='phone'
                    placeholder='+20123456789'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  />
                  {/* error phone */}
                  {Formik.errors.phone && Formik.touched.phone && (
                    <div
                      className='p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
                      role='alert'
                    >
                      {Formik.errors.phone}
                    </div>
                  )}
                </div>
                {/* Submit */}
                <button
                  type='submit'
                  disabled={
                    !(Formik.isValid && Formik.dirty) ||
                    !Formik.values.name ||
                    !Formik.values.email ||
                    !Formik.values.password ||
                    !Formik.values.rePassword ||
                    !Formik.values.phone ||
                    Object.keys(Formik.errors).length > 0
                  }
                  className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center
                    transition-all duration-200
                    ${
                      !(Formik.isValid && Formik.dirty) ||
                      !Formik.values.name ||
                      !Formik.values.email ||
                      !Formik.values.password ||
                      !Formik.values.rePassword ||
                      !Formik.values.phone ||
                      Object.keys(Formik.errors).length > 0
                        ? 'bg-purple/50 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                        : 'text-white bg-purple hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-purple/50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer'
                    }`}
                >
                  {!(Formik.isValid && Formik.dirty) ||
                  !Formik.values.name ||
                  !Formik.values.email ||
                  !Formik.values.password ||
                  !Formik.values.rePassword ||
                  !Formik.values.phone ||
                  Object.keys(Formik.errors).length > 0
                    ? 'Create an account'
                    : 'Create an account'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </>
  )
}
