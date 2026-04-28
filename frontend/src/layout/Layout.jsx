import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='flex flex-col p-2 min-h-screen'>
      <Header/>
        <main className='flex-grow'>
           <Outlet/>
        </main>
       <Footer/>
    </div>
  )
}

export default Layout
