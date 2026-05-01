import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { manangeResetPass } from '../services/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

/* 🔥 Zod Schema */
const formSchema = z.object({
  password: z.string().min(1,'Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1,'Newpassword is required').min(8, 'Confirm password required')
})

const Resetpass = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(formSchema),
    mode:'onChange'
  })

  const onSubmit = async (data) => {
    await manangeResetPass(
      data.password,
      data.confirmPassword,
      token,
      navigate
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200"
    >
      <section className="bg-white shadow-2xl rounded-2xl p-8 w-[380px]">

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Reset Password
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Enter your new password below
        </p>

        {/* Password */}
        <label htmlFor="password" className='font-medium'>Password:</label>
        <input
          type="password"
          id='password'
          placeholder="Enter new password"
          {...register("password")}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mb-3">
            {errors?.password && errors.password.message}
          </p>
        )}

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className='font-medium'>Confirmpassword:</label>
        <input
          type="password"
          id='confirmPassword'
          placeholder="Confirm password"
          {...register("confirmPassword")}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mb-3">
            {errors?.confirmPassword && errors.confirmPassword.message}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          {isSubmitting ? "Loading..." : "Reset Password"}
        </button>

      </section>
    </form>
  )
}

export default Resetpass