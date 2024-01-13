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
    <main className='main-register'>
      <RegisterForm />
    </main>
  )
}

export default RegisterPage