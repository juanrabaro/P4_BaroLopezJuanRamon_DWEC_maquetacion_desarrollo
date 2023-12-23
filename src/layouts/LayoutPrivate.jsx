import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const LayoutPrivate = () => {

  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  {/* manera dos */}
  useEffect(() => {
    !user && navigate("/")
  }, [user])
  


  return (
    <>
      {/* manera uno */}
      {/*
        user ? (<Outlet />) : (<h1>Tienes que estar logeado para ver el dashboard</h1>)
      */}
    
      {/* manera dos */}
      <Outlet />


      {/* manera tres */}
      {/*
        user ? <Outlet /> : <Navigate to ="/" />
      */}
    </>
  )
}

export default LayoutPrivate