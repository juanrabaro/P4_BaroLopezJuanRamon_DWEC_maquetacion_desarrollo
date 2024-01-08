import React, { useContext, useEffect, useRef, useState } from 'react'
import { bringUsers } from '../assets/localStorage'
import { UserContext } from '../context/userContext'

const SigninForm = () => {
  
  // user dirá si está logeado
  const { user, setUser } = useContext(UserContext)
  // lista de usuarios registrados
  const [listUsers, setListUsers] = useState([])
  // para el contador cuando no es correcta la información
  const hideMessage = useRef(null)
  // mensaje cuando no es correcta la información
  const [message, setMessage] = useState("Correo y/o contraseña no válidos")
  // controlar si los datos del formulario están correctos o no
  const [incorrectForm, setIncorrectForm] = useState(false)


  useEffect(() => {
    setListUsers(bringUsers())
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


  function signIn(e) {
    e.preventDefault()
    
    const userSigned = listUsers.filter((userObj) => {
      return JSON.stringify(userObj) === JSON.stringify(formUser)
    })

    userSigned.length ? (setUser(true), localStorage.setItem("userLogged", true)) : setIncorrectForm(true)

    if (hideMessage.current) {
      clearTimeout(hideMessage.current)
    }
    hideMessage.current = setTimeout(() => {
      setIncorrectForm(false)
    }, 2000)

  }

  
  return (
    <>
      <form>
        <label>Sign In</label>
        <input name='email' type="text" placeholder='gmail' onChange={ handleChange }/>
        <input name='pwd' type="text" placeholder='password' onChange={ handleChange }/>
        <button onClick={ signIn }>Sign in</button>
        {
          incorrectForm && (<p>{ message }</p>)
        }
      </form>
    </>
  )
}

export default SigninForm