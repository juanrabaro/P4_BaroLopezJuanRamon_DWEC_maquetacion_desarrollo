import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const LayoutRoot = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <footer>Footer</footer>
    </>
  )
}

export default LayoutRoot