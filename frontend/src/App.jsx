import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Forgotpass from './pages/Forgotpass'
import Auth from './pages/Auth'
import Otpverified from './pages/Otpverified'
import Resetpass from './pages/Resetpass'
import Layout from './layout/Layout'
 import { ToastContainer, toast } from 'react-toastify';
import Login from './components/Login'
import Register from './components/Register'
const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
    <Route path='/' element={<Layout/>}>
       <Route index element={<Home/>}/>
       <Route path='/auth' element={<Auth/>}/>
       <Route path='/otp' element={<Otpverified/>}/>
       <Route path='/password/forgot' element={<Forgotpass/>}/>
       <Route path='/password/reset/:token' element={<Resetpass/>}/>
       <Route path='/login' element={<Login/>} />
       <Route path='/register' element={<Register/>} />
    </Route>
   </Routes>
   </>
  )
}

export default App
