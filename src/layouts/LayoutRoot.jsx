import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { UserContext } from '../context/userContext'

const LayoutRoot = () => {

  // user is logged?
  const { user, setUser } = useContext(UserContext)
  
  
  useEffect(() => {
    const userLogged = JSON.parse(localStorage.getItem("userLogged")) || false
    userLogged ? setUser(true) : setUser(false)
  }, [])
  



  return (
    <>
      <NavBar />

      <Outlet />

      <Footer />
    </>
  )
}

export default LayoutRoot