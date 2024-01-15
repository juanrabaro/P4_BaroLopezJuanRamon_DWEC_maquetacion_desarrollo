import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const LayoutPrivate = () => {

  // user is logged?
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()


  useEffect(() => {
    !user && navigate("/")
  }, [user])


  
  return (
    <Outlet />
  )
}

export default LayoutPrivate