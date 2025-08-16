import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { BASE_URL } from '../../../environment/environment'
import toast, { Toaster } from 'react-hot-toast'
import { UserData } from '../../../context/UserContext'

export default function Login () {
  //#region state
  const [IsLogin, setIsLogin] = useState(false)
  let navigate = useNavigate()
  const { setToken } = useContext(UserData)
  //#endregion

  //#region  From login
  async function login (values) {
    try {
      await toast.promise(axios.post(`${BASE_URL}/auth/signin`, values), {
        loading: 'Logging in...',
        success: res => {
          const data = res.data
          if (data.message === 'success') {
            localStorage.setItem('token', data.token)
            setIsLogin(true)
            setToken(data.token)
            setTimeout(() => {
              navigate('/home')
            }, 1000)
            return <b>Successfully logged in!</b>
          }
          throw new Error('Login failed')
        },
        error: err => {
          if (err.response?.data?.message) {
            return <b>{err.response.data.message}</b>
          }
          return <b>Something went wrong</b>
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  //    validation
  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
  })
  // formik
  let Formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: login
  })
  //#endregion`

  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900 min-h-screen py-24'>
        <Toaster position='top-right' reverseOrder={false} />
        <div className='flex flex-col items-center justify-start pt-8 px-6 py-8 mx-auto lg:py-0'>
          <div className='w-full bg-white rounded-xl shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Login
              </h1>
              <form
                onSubmit={Formik.handleSubmit}
                className='space-y-4 md:space-y-6'
              >
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
                {/* Remember me and Forgot password */}
                <div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-start'>
                      <div className='flex items-center h-5'>
                        <input
                          id='remember'
                          aria-describedby='remember'
                          type='checkbox'
                          className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                        />
                      </div>
                      <label
                        htmlFor='remember'
                        className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Remember me
                      </label>
                    </div>
                    <NavLink to='/forgot-password'
                      className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                    >
                      Forgot password?
                    </NavLink>
                  </div>
                </div>
                {/* register */}
                <div>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-300'>
                    Don't have an account?{' '}
                    <NavLink
                      to='/register'
                      className='text-primary-600 hover:underline text-black dark:text-primary-500'
                    >
                      Register
                    </NavLink>
                  </p>
                </div>

                {/* Submit */}
                <button
                  type='submit'
                  disabled={!(Formik.isValid && Formik.dirty)}
                  className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center 
    transition-all duration-200 
    ${
      !(Formik.isValid && Formik.dirty) || Object.keys(Formik.errors).length > 0
        ? 'bg-purple/50 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
        : 'text-white bg-purple hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-purple/50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer'
    }`}
                >
                  login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
