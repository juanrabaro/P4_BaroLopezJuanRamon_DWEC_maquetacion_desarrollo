import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutButton = ({ setUser }) => {
  
  const navigate = useNavigate()


  function logout() {
    setUser(false)
    localStorage.setItem("userLogged", false)
    localStorage.setItem("userLoggedData", "")
    navigate("/")
  }


  return (
    <button onClick={ logout }>Logout</button>
  )
}

export default LogoutButton