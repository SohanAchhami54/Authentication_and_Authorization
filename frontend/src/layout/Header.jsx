import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { useApp } from '../context/context';
const Header = () => {
  const isNavActive=({isActive})=>{
    return isActive?'text-red-600':''
  }
  const [open,setOpen]=useState(false)
  const {handleLogout,isAuthenticated}=useApp()

  return (
    <>
      <header className='relative flex items-center justify-between md:justify-around  bg-green-400 p-3 font-semibold '>
         <div>
            <h2 className='text-xl'><NavLink to='/'> Authentication</NavLink></h2>
         </div>
         {/* for larger screen  */}
         <div className=' hidden md:flex gap-10'>

           {
                  isAuthenticated?(
                     <>
                       <button onClick={()=>{handleLogout()}} className='cursor-pointer'>Logout</button>
                     </>
                  ):(
                     <>
                        <NavLink to='/' className={isNavActive}  >Home</NavLink>
                        <NavLink to='/login' className={isNavActive} >Login</NavLink>
                       <NavLink to='/register' className={isNavActive} >Register</ NavLink>
                     </>
                  )
               }
         </div>
            { !open && (
               <GiHamburgerMenu onClick={()=>setOpen(prev=>!prev)}   className='flex md:hidden' />
            )}
              
         { 
            open && (
             <nav className='flex flex-col gap-3 absolute top-0 right-0 p-2  min-h-screen bg-green-300 '>
               {
                  isAuthenticated?(
                     <>
                       <button onClick={()=>{handleLogout()}} className='cursor-pointer'>Logout</button>
                     </>
                  ):(
                     <>
                        <NavLink to='/' className={isNavActive} onClick={()=>setOpen(prev=>!prev)} >Home</NavLink>
                       <NavLink to='/login' className={isNavActive} onClick={()=>setOpen(prev=>!prev)}>Login</NavLink>
                       <  NavLink to='/register' className={isNavActive} onClick={()=>setOpen(prev=>!prev)}>Register</    NavLink>
                     </>
                  )
               }
            </nav>
            )}
      </header>
    </>
  )
}

export default Header
