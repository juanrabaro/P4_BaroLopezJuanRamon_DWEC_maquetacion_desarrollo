import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { loadUserLoggedData } from '../localStorage/localStorage'

const SigninForm = () => {
  
  // user dirá si está logeado
  const { user, setUser } = useContext(UserContext)
  // lista de usuarios registrados
  const [listUsers, setListUsers] = useState([])
  // para el contador cuando no es correcta la información
  const hideMessage = useRef(null)
  // mensaje cuando no es correcta la información
  const [message, setMessage] = useState("")
  // controlar si los datos del formulario están correctos o no
  const [incorrectForm, setIncorrectForm] = useState(false)
  const navigate = useNavigate()
  // if the form has some information enable the sign in button
  const [validData, setValidData] = useState(false)


  useEffect(() => {
    setListUsers(JSON.parse(localStorage.getItem("usersData")) || [])
  }, [])


  // estado de los datos del usuario en tiempo real
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

    console.log(userExist)
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
    <>
      <form>
        <label>Sign In</label>
        <input name='email' type="text" placeholder='gmail' onChange={ handleChange }/>
        <input name='pwd' type="text" placeholder='password' onChange={ handleChange }/>
        <button disabled={ !validData } onClick={ signIn }>Sign in</button>
        {
          incorrectForm && (<p>{ message }</p>)
        }
      </form>
    </>
  )
}

export default SigninForm