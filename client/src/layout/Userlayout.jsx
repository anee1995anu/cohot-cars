import React from 'react'


import Header from '../components/user/Header'
import Footer from '../components/user/Footer'
import { Outlet } from 'react-router-dom'

const Userlayout = () => {
  return (
    <div>
      <Header/>

       <div className='w-f min-h-96'> <Outlet/></div> 
     
      <Footer/>
      
    </div>
  )
}

export default Userlayout
