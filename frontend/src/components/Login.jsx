import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod' 
import  * as z from 'zod'
import { toast } from 'react-toastify'
import Axios from '../api/axios'
import { Link } from 'react-router-dom'
import { userLogin } from '../services/auth'
import { useApp } from '../context/context'

const formSchema=z.object({
    email: z.string().min(1, 'Email is required').email('Invalid Email Address'),
    password: z.string().min(1, 'Password is required').min(8, 'Password should be at least 8 characters'),
    phone: z.string().min(1, 'Phone is required').min(10, 'Phone number should be at least 10 digits'),
})

const Login = () => {
  
    const {isAuthenticated,setIsAuthenticated,user,setUser}=useApp()
    const {register,handleSubmit,reset,formState:{errors,isSubmitting,isValid}}=useForm({
        resolver:zodResolver(formSchema), 
        mode:'onChange'
    })

    const onSubmit=async(formData)=>{
        await userLogin(formData)
        reset()
    }
  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center'>
        <section className='flex flex-col'>
        <label htmlFor="email">Email:</label>
        <input type="email" id='email' {...register('email')} required
        className='border ' />
        {errors.email && <p className='text-red-600'>{errors.email.message} </p>}

        <label htmlFor="phone">Phone:</label>
        <input type="number" id='phone' {...register('phone')} required
        className='border ' />
         {errors.phone && <p className='text-red-600'>{errors.phone.message} </p>}

        <label htmlFor="password">Password:</label>
        <input type="password" id='password' {...register('password')} required
        className='border ' />   
           {errors.password && <p className='text-red-600'>{errors.password.message} </p>}

        <button type='submit' disabled='isSubmitting'
        className='p-1 bg-green-400 m-2 rounded-md'
        >Login</button>
        </section>
      </form> */}
      <form
  onSubmit={handleSubmit(onSubmit)}
  className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200"
>
  <section className="bg-white shadow-2xl rounded-2xl p-8 w-[380px]">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Login
    </h1>

    {/* Email */}
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        {...register("email")}
        required
        placeholder="Enter your email"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      {errors.email && (
        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>

    {/* Phone */}
    <div className="mb-4">
      <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
        Phone
      </label>
      <input
        type="number"
        id="phone"
        {...register("phone")}
        required
        placeholder="Enter your phone"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      {errors.phone && (
        <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
      )}
    </div>

    {/* Password */}
    <div className="mb-4">
      <label
        htmlFor="password"
        className="block text-gray-700 font-medium mb-1"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        {...register("password")}
        required
        placeholder="Enter your password"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      {errors.password && (
        <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
      )}
    </div>

    {/* Button */}
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300"
    >
      {isSubmitting ? "Loading..." : "Login"}
    </button>

    {/* Forgot Password */}
    <p className="text-center mt-4">
      <Link to="/password/forgot" className="text-indigo-500 hover:underline">
        Forgot Password?
      </Link>
    </p>

    {/* Create Account */}
    <p className="text-center mt-2 text-gray-600">
      Don't have an account?
      <Link to="/register" className="text-green-500 hover:underline font-medium">
        Create New Account
      </Link>
    </p>
  </section>
</form>
    </>
  )
}

export default Login
