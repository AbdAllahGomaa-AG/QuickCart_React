import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BASE_URL } from '../../../environment/environment'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserData } from '../../../context/UserContext'

export default function ForgetPassword () {
  // #region state
  let navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
    const { Token, setToken } = useContext(UserData)

  //   #endregion

  // #region ForgetPassword step 1 send email
  //#region ForgetPassword Function
  async function ForgetPassword (values) {
    try {
      setEmail(values.email)

      await toast.promise(
        axios.post(`${BASE_URL}/auth/forgotPasswords`, values),
        {
          loading: 'Sending...',
          success: res => {
            const data = res.data
            if (data.statusMsg === 'success') {
              setStep(2)

              return <b>Successfully sent!</b>
            }
            throw new Error('Registration failed')
          },
          error: err => {
            if (err.response?.data?.message) {
              return <b>{err.response.data.message}</b>
            }
            return <b>Something went wrong</b>
          }
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
  //#endregion

  // #region Formik
  let Formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: ForgetPassword
  })
  //#endregion

  //#endregion

  // #region ForgetPassword step 2 verifyResetCode

  //#region ForgetPassword Function
  async function VerifyResetCode (values) {
    try {
      await toast.promise(
        axios.post(`${BASE_URL}/auth/verifyResetCode`, values),
        {
          loading: 'Sending...',
          success: res => {
            const data = res.data

            if (data.status === 'Success') {
              setStep(3)
              return <b>Successfully verified!</b>
            }
            throw new Error('Registration failed')
          },
          error: err => {
            if (err.response?.data?.message) {
              return <b>{err.response.data.message}</b>
            }
            return <b>Something went wrong</b>
          }
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
  //#endregion

  // #region Formik
  let FormikVerifyResetCode = useFormik({
    initialValues: {
      resetCode: ''
    },
    onSubmit: VerifyResetCode
  })
  //#endregion

  //#endregion

  // #region ForgetPassword step 3 resetPassword

  //#region  validation
  let validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Password must be at least 8 characters long and contain at least one letter and one number'
      )
      .required('Password is required')
  })
  //#endregion

  // #region Formik
  let FormikResetPassword = useFormik({
    initialValues: {
      email: email,
      newPassword: ''
    },
    onSubmit: ResetPassword,
    validationSchema: validationSchema,
    enableReinitialize: true
  })
  //#endregion

  //#region ForgetPassword Function
  async function ResetPassword (values) {
    try {
      await toast.promise(axios.put(`${BASE_URL}/auth/resetPassword`, values), {
        loading: 'Sending...',
        success: res => {
          const data = res.data
          if (data.token) {
            localStorage.setItem('token', data.token)
            setToken(data.token)

            navigate('/home')
            return <b>Successfully reset!</b>
          }
          throw new Error('Registration failed')
        },
        error: err => {
          if (err.response?.data?.message) {
            return <b>{err.response.data.message}</b>
          }
          return <b>Something went wrong</b>
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  //#endregion

  //#endregion

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <section className='bg-gray-50 dark:bg-gray-900 min-h-screen py-24'>
        <div className='flex flex-col items-center justify-start pt-8 px-6 py-8 mx-auto lg:py-0'>
          <div className='w-full bg-white rounded-xl shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            {/*  */}
            {step === 1 ? (
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  Forgot Password
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
                  {/* Submit */}
                  <button
                    type='submit'
                    disabled={
                      !Formik.values.email ||
                      !!Formik.errors.email ||
                      !Formik.dirty
                    }
                    className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center
                            transition-all duration-200
                            ${
                              !Formik.values.email ||
                              !!Formik.errors.email ||
                              !Formik.dirty
                                ? 'bg-purple/50 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                                : 'text-white bg-purple hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-purple/50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer'
                            }`}
                  >
                    Send Reset Link
                  </button>
                </form>
              </div>
            ) : null}
            {/*  */}
            {step === 2 ? (
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  Forgot Password
                </h1>
                <form
                  onSubmit={FormikVerifyResetCode.handleSubmit}
                  className='space-y-4 md:space-y-6'
                >
                  {/* Email */}
                  <div>
                    <label
                      htmlFor='resetCode'
                      className='block mb-2 text-sm  text-gray-900 dark:text-white font-bold'
                    >
                      Verify Reset Code
                    </label>
                    <input
                      name='resetCode'
                      onChange={FormikVerifyResetCode.handleChange}
                      onBlur={FormikVerifyResetCode.handleBlur}
                      value={FormikVerifyResetCode.values.resetCode}
                      type='text'
                      id='resetCode'
                      placeholder='Enter your reset code'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                    {/* error resetCode */}
                    {FormikVerifyResetCode.errors.resetCode &&
                      FormikVerifyResetCode.touched.resetCode && (
                        <div
                          className='p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
                          role='alert'
                        >
                          {Formik.errors.resetCode}
                        </div>
                      )}
                  </div>
                  {/* Submit */}
                  <button
                    type='submit'
                    disabled={
                      !FormikVerifyResetCode.values.resetCode ||
                      !!FormikVerifyResetCode.errors.resetCode ||
                      !FormikVerifyResetCode.dirty
                    }
                    className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center
                            transition-all duration-200
                            ${
                              !FormikVerifyResetCode.values.resetCode ||
                              !!FormikVerifyResetCode.errors.resetCode ||
                              !FormikVerifyResetCode.dirty
                                ? 'bg-purple/50 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                                : 'text-white bg-purple hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-purple/50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer'
                            }`}
                  >
                    Verify Reset Code
                  </button>
                </form>
              </div>
            ) : null}
            {/*  */}
            {step === 3 ? (
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  Forgot Password
                </h1>
                <form
                  onSubmit={FormikResetPassword.handleSubmit}
                  className='space-y-4 md:space-y-6'
                >
                  {/* newPassword */}
                  <div>
                    <label
                      htmlFor='newPassword'
                      className='block mb-2 text-sm  text-gray-900 dark:text-white font-bold'
                    >
                      create new password
                    </label>
                    <input
                      name='newPassword'
                      onChange={FormikResetPassword.handleChange}
                      onBlur={FormikResetPassword.handleBlur}
                      value={FormikResetPassword.values.newPassword}
                      type='password'
                      id='newPassword'
                      placeholder='Enter your new password'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                    {/* error newPassword */}
                    {FormikResetPassword.errors.newPassword &&
                      FormikResetPassword.touched.newPassword && (
                        <div
                          className='p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
                          role='alert'
                        >
                          {FormikResetPassword.errors.newPassword}
                        </div>
                      )}
                  </div>
                  {/* Submit */}
                  <button
                    type='submit'
                    disabled={
                      !FormikResetPassword.values.newPassword ||
                      !!FormikResetPassword.errors.newPassword ||
                      !FormikResetPassword.dirty
                    }
                    className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center
                            transition-all duration-200
                            ${
                              !FormikResetPassword.values.newPassword ||
                              !!FormikResetPassword.errors.newPassword ||
                              !FormikResetPassword.dirty
                                ? 'bg-purple/50 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                                : 'text-white bg-purple hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-purple/50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer'
                            }`}
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}
