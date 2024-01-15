import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { allUsersData } from '../localStorage/localStorage'

const SigninForm = () => {
  
  // user is logged?
  const { user, setUser } = useContext(UserContext)

  // list of all users saved in localStorage
  const [listUsers, setListUsers] = useState(allUsersData())

  const hideMessage = useRef(null)
  const [message, setMessage] = useState("")
  const [incorrectForm, setIncorrectForm] = useState(false)
  const navigate = useNavigate()
  const [validData, setValidData] = useState(false)

  // form data
  const [formUser, setFormUser] = useState({
    email: "",
    pwd: ""
  })




  function handleChange(e) {
    const { name, value } = e.target
    setFormUser({
      ...formUser,
      [name]: value
    })
  }




  useEffect(() => {
    (formUser.email && formUser.pwd) ? setValidData(true) : setValidData(false)
  }, [formUser])
  



  function signIn(e) {
    e.preventDefault()
    const userExist = listUsers.filter((userObj) => {
      return userObj.email === formUser.email
    })

    if ( userExist.length ) {
      if ( userExist[0].pwd === formUser.pwd ) {
        localStorage.setItem("userLogged", true)
        localStorage.setItem("userLoggedEmail", formUser.email)
        setUser(true)
        navigate("/")
      } else {
        setMessage("Email and/or password are incorrect!")
        setIncorrectForm(true)
        if (hideMessage.current) {
          clearTimeout(hideMessage.current)
        }
        hideMessage.current = setTimeout(() => {
          setMessage("")
          setIncorrectForm(false)
        }, 2000)
      }
    } else {
      setMessage("This email is not registered!")
      setIncorrectForm(true)
      if (hideMessage.current) {
        clearTimeout(hideMessage.current)
      }
      hideMessage.current = setTimeout(() => {
        setMessage("")
        setIncorrectForm(false)
      }, 2000)
    }
  }




  
  return (
    <div className='main-home__forms__signin-form-container'>
      <h2>Sign In</h2>
      <form className='signin-form'>
        <div className='signin-form__inputs'>
        <label>Email</label>
        <input name='email' type="text" placeholder='Email' onChange={ handleChange }/>
      </div>
      <div className='signin-form__inputs'>
        <label>Password</label>
        <input name='pwd' type="text" placeholder='Password' onChange={ handleChange }/>
      </div>
        <button disabled={ !validData } onClick={ signIn }>Sign in</button>
        {
          incorrectForm && (<p className='signin-form__error-message'>{ message }</p>)
        }
      </form>
    </div>
  )
}

export default SigninForm