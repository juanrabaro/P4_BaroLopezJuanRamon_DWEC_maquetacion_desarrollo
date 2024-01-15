import React, { useContext, useEffect, useRef, useState } from 'react'
import { allUsersData, uploadNewUsersData } from '../localStorage/localStorage'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {

  // user is logged?
  const { user, setUser } = useContext(UserContext)

  const [validData, setValidData] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [emailValid, setEmailValid] = useState(false)
  const [pwdValid, setPwdValid] = useState(false)
  const [usernameValid, setUsernameValid] = useState(false)
  const [ageValid, setAgeValid] = useState(false)
  const [conditionsValid, setConditionsValid] = useState(false)

  const [repUser, setRepUser] = useState(false)
  const repUserMessage = "The user is already created, try SIGN IN"
  const hideMessage = useRef(null)
  const navigate = useNavigate()

  // list of all users saved in localStorage
  const [listUsers, setListUsers] = useState(allUsersData())

  // form data
  const [formUser, setFormUser] = useState({
    email: "",
    pwd: "",
    username: "",
    age: 0,
    conditions: false,
    favs: {
      facts: [],
      breeds: []
    }
  })




  function handleChange(e) {
    const { name, value, checked } = e.target
    
    setFormUser({
      ...formUser,
      [ name ] : value
    })

    validation(name, value, checked)
  }
  


  
  function validation(name, value, checked) {
    if ( name === "email" ) {
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
  



  useEffect(() => {
    (emailValid && pwdValid && usernameValid && ageValid && conditionsValid) ?
    setValidData(true)
    :
    setValidData(false)
  }, [ageValid, conditionsValid, emailValid, pwdValid, usernameValid])
  



  function register(e) {
    e.preventDefault()
    const repUsers = listUsers.filter((userObj) => {
      return userObj.email === formUser.email
    })

    // the user is not a rep user
    if ( !repUsers.length ) {
      uploadNewUsersData(formUser)
      localStorage.setItem("userLoggedEmail", formUser.email)
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
    <div className='main-home__forms__register-form-container'>
      <h2>Register</h2>
      <form className='register-form' onSubmit={ register }>
        <div className='register-form__inputs'>
          <label>Email</label>
          <input name='email' type="email" placeholder='Email' onChange={ handleChange }/>
        </div>
        <div className='register-form__inputs'>
          <label>Password</label>
          <input name='pwd' type="password" placeholder='Password' onChange={ handleChange }/>
        </div>
        <div className='register-form__inputs'>
          <label>Username</label>
          <input name='username' type="text" placeholder='Username'  onChange={ handleChange }/>
        </div>
        <div className='register-form__inputs'>
          <label>Age</label>
          <input name='age' type="number" placeholder='Age'  onChange={ handleChange }/>
        </div>
        <div className='register-form__input-checkbox'>
          <input name="conditions" type="checkbox"  onChange={ handleChange }/>
          <label>Acept terms and conditions</label>
        </div>
        {
          !validData && <div className='register-form__error-message'>{ errorMessage }</div>
        }
        <button disabled={ !validData }>Register</button>
        {
          repUser && <p className='register-form__error-message'>{ repUserMessage }</p>
        }
      </form>
    </div>
  )
}

export default RegisterForm