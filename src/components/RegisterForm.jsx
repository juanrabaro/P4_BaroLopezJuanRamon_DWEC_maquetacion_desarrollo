import React, { useContext, useEffect, useRef, useState } from 'react'
import { loadUserLoggedData, uploadNewUsersData } from '../localStorage/localStorage'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {

  // user dirá si está logeado
  const { user, setUser, userLoggedData, setUserLoggedData } = useContext(UserContext)
  // indica si hay error de validación
  const [validData, setValidData] = useState(false)
  // contenido del error de validación
  const [errorMessage, setErrorMessage] = useState("")
  // validar formulario
  const [emailValid, setEmailValid] = useState(false)
  const [pwdValid, setPwdValid] = useState(false)
  const [usernameValid, setUsernameValid] = useState(false)
  const [ageValid, setAgeValid] = useState(false)
  const [conditionsValid, setConditionsValid] = useState(false)

  const [repUser, setRepUser] = useState(false)
  const repUserMessage = "The user is already created, try SIGN IN"
  const hideMessage = useRef(null)
  const navigate = useNavigate()

  // lista todos usuarios
  // llenar lista usuarios con datos del localStorage
  const [listUsers, setListUsers] = useState(JSON.parse(localStorage.getItem("usersData")) || [])

  // estado de los datos del usuario en tiempo real
  const [formUser, setFormUser] = useState({
    email: "",
    pwd: "",
    username: "",
    age: 0,
    conditions: false,
  })


  // cuando un valor del formulario cambia se modifica el estado del usuario en tiempo real
  function handleChange(e) {
    const { name, value, checked } = e.target
    setFormUser({
      ...formUser,
      [ name ] : value
    })
    //console.log(formUser)

    // validación en tiempo real
    validation(name, value, checked)
  }
  
  
  function validation(name, value, checked) {
    if ( name === "email" ) {
      // Expresión regular para validar un formato de correo electrónico básico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const isValidEmail = emailRegex.test(value)

      !isValidEmail && (setErrorMessage("Invalid email!"), setEmailValid(false))
      isValidEmail && (setErrorMessage(""), setEmailValid(true))
    }
    if ( name === "pwd" ) {
      value.length < 8 ?
      (setErrorMessage("The password must have at least 8 characters"), setPwdValid(false))
      :
      (setErrorMessage(""), setPwdValid(true))
    }
    if ( name === "username" ) {
      value.length < 2 ?
      (setErrorMessage("The username must have at least 2 characters"), setUsernameValid(false))
      :
      (setErrorMessage(""), setUsernameValid(true))
    }
    if ( name === "age" ) {
      value < 1 ?
      (setErrorMessage("The age can't be negative or 0 or any other thing"), setAgeValid(false))
      :
      (setErrorMessage(""), setAgeValid(true))
    }
    if ( name === "conditions" ) {
      !checked ?
      (setErrorMessage("Please accept the terms and conditions"), setConditionsValid(false))
      :
      (setErrorMessage(""), setConditionsValid(true))
    }
  }
  
  // Permitir enviar datos
  useEffect(() => {
    (emailValid && pwdValid && usernameValid && ageValid && conditionsValid) ?
    setValidData(true)
    :
    setValidData(false)
    
  }, [ageValid, conditionsValid, emailValid, pwdValid, usernameValid])
  


  // cuando se hace submit se ejecuta
  function register(e) {
    e.preventDefault()

    const repUsers = listUsers.filter((userObj) => {
      return userObj.email === formUser.email
    })

    
    // the user is not a rep user
    if ( !repUsers.length ) {
      uploadNewUsersData(formUser)
      localStorage.setItem("userLoggedEmail", formUser.email)

      // usuario logeado activa layouts privados
      localStorage.setItem("userLogged", true)
      setUser(true)
      navigate("/")
      return
    }
    // the user is a rep user
    setRepUser(true)
    if (hideMessage.current) {
      clearTimeout(hideMessage.current)
    }
    hideMessage.current = setTimeout(() => {
      setRepUser(false)
    }, 2000)
  }

  
  


  return (
    <>
      <form className='login-form' onSubmit={ register }>
        <label>Register Form</label>
        <label>Email</label>
        <input name='email' type="email" placeholder='Email' onChange={ handleChange }/>
        <label>Password</label>
        <input name='pwd' type="password" placeholder='Password' onChange={ handleChange }/>
        <label>Username</label>
        <input name='username' type="text" placeholder='Username'  onChange={ handleChange }/>
        <label>Age</label>
        <input name='age' type="number" placeholder='Age'  onChange={ handleChange }/>
        <label>Acept terms and conditions</label>
        <input name="conditions" type="checkbox"  onChange={ handleChange }/>
        {
          !validData && <div>{ errorMessage }</div>
        }
        <button disabled={ !validData }>Register</button>
        {
          repUser && <p>{ repUserMessage }</p>
        }
      </form>
    </>
  )
}


export default RegisterForm