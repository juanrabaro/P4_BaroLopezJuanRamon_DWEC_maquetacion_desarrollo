import React, { useContext, useEffect, useState } from 'react'
import { bringUsers } from '../assets/localStorage'
import { UserContext } from '../context/userContext'

const SigninForm = () => {
  
  // user dirá si está logeado
  const { user, setUser } = useContext(UserContext)
  // lista de usuarios registrados
  const [listUsers, setListUsers] = useState([])


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

    userSigned.length && (setUser(true), localStorage.setItem("userLogged", true))

  }

  
  return (
    <>
      <form>
        <label>Sign In</label>
        <input name='email' type="text" placeholder='gmail' onChange={ handleChange }/>
        <input name='pwd' type="text" placeholder='password' onChange={ handleChange }/>
        <button onClick={ signIn }>Sign in</button>
      </form>
    </>
  )
}

export default SigninForm