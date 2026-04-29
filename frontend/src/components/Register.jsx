import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import { userRegister } from '../services/auth'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required').min(3, 'Name must be at least 3 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required').min(10, 'Phone must be 10 characters'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
  verificationMethod: z.enum(['email', 'phone'], {
    errorMap: () => ({ message: 'Please select a verification method' })
  })
})

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  })

  const navigate = useNavigate()

  const onSubmit = async (formData) => {
     const res= await userRegister(formData,navigate)
     if(res) reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200"
    >
      <section className="bg-white shadow-2xl rounded-2xl p-8 w-[420px]">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
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
            {...register('phone')}
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Verification Method */}
        <div className="mb-6">
          <p className="block text-gray-700 font-medium mb-2">Verification Method</p>
          <div className="flex gap-6">

            <label htmlFor="email-verify" className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                id="email-verify"
                value="email"
                {...register('verificationMethod')}
                className="accent-indigo-500 w-4 h-4"
              />
              <span className="text-gray-700">Email</span>
            </label>

            <label htmlFor="phone-verify" className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                id="phone-verify"
                value="phone"
                {...register('verificationMethod')}
                className="accent-indigo-500 w-4 h-4"
              />
              <span className="text-gray-700">Phone</span>
            </label>

          </div>
          {errors.verificationMethod && (
            <p className="text-red-600 text-sm mt-1">{errors.verificationMethod.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        {/* Already have account */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-500 hover:underline font-medium">
            Login
          </Link>
        </p>

      </section>
    </form>
  )
}

export default Register