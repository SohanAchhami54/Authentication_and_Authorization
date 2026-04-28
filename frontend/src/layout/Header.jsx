import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
const Header = () => {
  const isNavActive=({isActive})=>{
    return isActive?'text-red-600':''
  }
  const [open,setOpen]=useState(false)

  return (
    <>
      <header className='relative flex items-center justify-between md:justify-around  bg-green-400 p-3 font-semibold '>
         <div>
            <h2 className='text-xl'>Authentication</h2>
         </div>
         {/* for larger screen  */}
         <div className=' hidden md:flex gap-10'>
            <NavLink to='/' className={isNavActive}>Home</NavLink>
            <NavLink to='/login' className={isNavActive}>Login</NavLink>
            <NavLink to='/register' className={isNavActive}>Register</NavLink>
            {/* <NavLink to='/auth' className={isNavActive}>Auth</NavLink>
            <NavLink to='/otp' className={isNavActive}>OTP</NavLink>
            <NavLink to='/password/forgot' className={isNavActive}>ForgotPassword</NavLink>
            <NavLink to='/password/reset/:token' className={isNavActive}>ResetPassword</NavLink> */}
         </div>
            { !open && (
               <GiHamburgerMenu onClick={()=>setOpen(prev=>!prev)}   className='flex md:hidden' />
            )}
              
         { 
            open && (
             <nav className='flex flex-col gap-3 absolute top-0 right-0 p-2  min-h-screen bg-green-300 '>
              <NavLink to='/' className={isNavActive} onClick={()=>setOpen(prev=>!prev)} >Home</NavLink>
               <NavLink to='/login' className={isNavActive} onClick={()=>setOpen(prev=>!prev)}>Login</NavLink>
              <NavLink to='/register' className={isNavActive} onClick={()=>setOpen(prev=>!prev)}>Register</NavLink>
              {/* <NavLink to='/auth' className={isNavActive} onClick={()=>setOpen(prev=>!prev)}>Auth</NavLink>
            <NavLink to='/otp' className={isNavActive} onClick={()=>setOpen(prev=>!prev)}>OTP</NavLink>
            <NavLink to='/forgotpassword' className={isNavActive} onClick={()=>setOpen(prev=>!prev)}>ForgotPassword</NavLink>
            <NavLink to='/resetpassword' className={isNavActive} onClick={()=>setOpen(prev=>!prev)}>ResetPassword</NavLink>  */}
            </nav>
            )}
      </header>
    </>
  )
}

export default Header
