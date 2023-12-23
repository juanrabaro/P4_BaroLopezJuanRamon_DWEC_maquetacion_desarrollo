import React, { useContext, useEffect, useState } from 'react'
import { bringUsers, uploadUser } from '../assets/localStorage'
import { UserContext } from '../context/userContext'

const LoginForm = () => {

  // user dirá si está logeado
  const { user, setUser } = useContext(UserContext)

  // lista todos usuarios
  const [listUsers, setListUsers] = useState([])

  // llenar lista usuarios con datos del localStorage
  useEffect(() => {
    // PROVISIONAL borrar localStorage
    //localStorage.removeItem("users")
    
    setListUsers(bringUsers())
  }, [])
  

  // estado de los datos del usuario en tiempo real
  const [formUser, setFormUser] = useState({
    email: "",
    pwd: ""
  })


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
    setUser(true)
  }


  // cuando un valor del formulario cambia se modifica el estado del usuario en tiempo real
  function handleChange(e) {
    const { name, value } = e.target
    setFormUser({
      ...formUser,
      [ name ] : value
    })
    console.log(formUser)
  }


  return (
    <>
      <form onSubmit={ logIn }>
        <label>Log In</label>
        <input name='email' type="text" placeholder='gmail' onChange={ handleChange }/>
        <input name='pwd' type="text" placeholder='password' onChange={ handleChange }/>
        <button>Log in</button>
      </form>
    </>
  )
}


export default LoginForm