import React, { useContext, useEffect } from 'react'
import SigninForm from "../components/SigninForm"
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const SignInPage = () => {

  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userLogged"))) {
      navigate("/")
    }
  }, [])


  return (
    <>
      <h1>SignInPage</h1>
      <SigninForm />
    </>
  )
}

export default SignInPage