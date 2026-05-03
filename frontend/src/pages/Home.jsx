import React from 'react'
import { useApp } from '../context/context'

const Home = () => {
  const { user } = useApp()
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Home
        </h1>

        <span className="text-lg text-gray-600">
          Hello, <span className="font-semibold text-blue-600">{user?.name}</span> Developer
        </span>
      </div>
    </div>
  )
}

export default Home