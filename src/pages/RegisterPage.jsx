import React, { useContext, useEffect } from 'react'
import RegisterForm from '../components/RegisterForm'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userLogged"))) {
      navigate("/")
    }
  }, [])
  
  
  return (
    <>
      <h1>RegisterPage</h1>
      <RegisterForm />
    </>
  )
}

export default RegisterPage