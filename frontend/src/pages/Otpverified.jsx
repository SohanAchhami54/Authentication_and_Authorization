import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/context'
import { handleOtp } from '../services/auth'

const Otpverified = () => {
  const [otp,setOtp]=useState(['','','','',''])
  const {isAuthenticated,setIsAuthenticated,user,setUser}=useApp()
  const {email,phone}=useParams()
  const navigate=useNavigate()
 
  const handleChange=(value,index)=>{
    if( !/^\d*$/.test(value)) return 
    const newOtp=[...otp] 
     newOtp[index]=value 
     setOtp(newOtp)
    if(value && index< otp.length-1){
     document.getElementById(`otp-input-${index+1}`).focus()
  }
}


  const handleKeyDown=(e,index)=>{
      if(e.key==='Backspace' && otp[index]==='' && index>0){
        document.getElementById(`otp-input-${index-1}`).focus()
      }
  }

  const handleSubmit=async(e)=>{
      e.preventDefault()
      const enteredOtp=otp.join('') 
      const payload={
        email,
        otp:enteredOtp, 
        phone
      }
      await handleOtp(payload,setUser,setIsAuthenticated,navigate)
  }

  return (
  <form
    onSubmit={handleSubmit}
    className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200"
  >
    <section className="bg-white shadow-2xl rounded-2xl p-8 w-[380px] text-center">
      
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        OTP Verification
      </h1>

      <p className="text-gray-600 mb-6">
        Enter the 5-digit OTP sent to your Email
      </p>

      {/* OTP Inputs */}
      <div className="flex justify-between gap-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ))}
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300"
      >
        Verify OTP
      </button>

    </section>
  </form>
)
}

export default Otpverified
