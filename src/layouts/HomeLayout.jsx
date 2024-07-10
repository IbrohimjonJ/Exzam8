import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../componets/Navbar'

function HomeLayout() {
  return (
    <div >
        <main>
          <Navbar/>  
        </main>
        <main>
      <Outlet/>
        </main>
    </div>
  )
}

export default HomeLayout
