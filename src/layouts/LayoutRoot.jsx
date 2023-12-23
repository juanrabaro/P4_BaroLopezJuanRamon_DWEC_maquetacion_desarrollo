import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { UserContext } from '../context/userContext'

const LayoutRoot = () => {

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    //localStorage.setItem("userLogged", false)
    const userLogged = JSON.parse(localStorage.getItem("userLogged")) || false
    userLogged ? setUser(true) : setUser(false)
  }, [])


  return (
    <>
      <NavBar />
      <Outlet />
      <footer>Footer</footer>
    </>
  )
}

export default LayoutRoot