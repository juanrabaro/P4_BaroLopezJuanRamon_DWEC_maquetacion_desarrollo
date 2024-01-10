import React, { useContext, useState } from 'react'
import LoginForm from '../components/LoginForm'
import SigninForm from '../components/SigninForm'
import { UserContext } from '../context/userContext'
import RandomFact from '../components/RandomFact'

const Home = () => {

  // user logged?
  const { user, setUser } = useContext(UserContext)


  return (
    <>
      <h1>CAT FACTS</h1>
      <img className='home-image' src="/public/img/imagenPrincipal.png" alt="main image" />
      <RandomFact/>
      {
        !user && (
          <>
            <LoginForm />
            <SigninForm />
          </>
        )
      }
    </>
  )
}

export default Home