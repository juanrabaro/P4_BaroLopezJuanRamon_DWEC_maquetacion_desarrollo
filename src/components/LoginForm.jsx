import React, { useContext, useEffect, useState } from 'react'
import { bringUsers, uploadUser } from '../assets/localStorage'
import { UserContext } from '../context/userContext'

const LoginForm = () => {

  // user dirá si está logeado
  const { user, setUser } = useContext(UserContext)
  // indica si hay error de validación
  const [validData, setValidData] = useState(false)
  // contenido del error de validación
  const [errorMessage, setErrorMessage] = useState("")
  // validar email y pwd
  const [emailValid, setEmailValid] = useState(false)
  const [pwdValid, setPwdValid] = useState(false)

  // lista todos usuarios
  const [listUsers, setListUsers] = useState([])

  // llenar lista usuarios con datos del localStorage
  useEffect(() => {
    setListUsers(bringUsers())
  }, [])
  

  // estado de los datos del usuario en tiempo real
  const [formUser, setFormUser] = useState({
    email: "",
    pwd: ""
  })


  // cuando un valor del formulario cambia se modifica el estado del usuario en tiempo real
  function handleChange(e) {
    const { name, value } = e.target
    setFormUser({
      ...formUser,
      [ name ] : value
    })
    //console.log(formUser)

    // validación en tiempo real
    validation(name, value)
  }
  
  
  function validation(name, value) {
    
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
  }
  
  // Permitir enviar datos
  useEffect(() => {
    (emailValid && pwdValid) ?
    setValidData(true)
    :
    setValidData(false)
    
  }, [emailValid, pwdValid])
  


  // cuando se hace submit se ejecuta
  function logIn(e) {
    e.preventDefault()
    // actualiza lista de usuarios
    setListUsers(prevListUsers => {
      const updatedListUsers = [...prevListUsers, formUser]
      // añade al localStorage la nueva lista de usuarios
      uploadUser(updatedListUsers)
      return updatedListUsers
    })

    // usuario logeado activa layouts privados
    localStorage.setItem("userLogged", true)
    setUser(true)
  }


  return (
    <>
      <form className='login-form' onSubmit={ logIn }>
        <label>Log In</label>
        <input name='email' type="text" placeholder='gmail' onChange={ handleChange }/>
        <input name='pwd' type="text" placeholder='password' onChange={ handleChange }/>
        {
          !validData && <div>{ errorMessage }</div>
        }
        <button disabled={ !validData }>Log in</button>        
      </form>
    </>
  )
}


export default LoginForm