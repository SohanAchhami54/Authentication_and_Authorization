import React, { useState } from 'react'
import { manangeForgotPass } from '../services/auth'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema=z.object({
    email:z.string().min(1,'Email is required').email('Invalid Email Address')
})

const Forgotpass = () => {

 
  const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm({
      resolver:zodResolver(formSchema),
      mode:'onChange'
  }) 

  const onsubmit = async (data) => {
      await manangeForgotPass(data.email,reset)
    
  }

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200"
    >
      <section className="bg-white shadow-2xl rounded-2xl p-8 w-[380px]">
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Enter your email to receive reset link
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
           {...register('email')}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <p className='text-red-500'>{errors.email && errors.email?.message} </p>

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
        {isSubmitting?'Email Sending':'Send Reset Link'} 
        </button>

      </section>
    </form>
  )
}

export default Forgotpass