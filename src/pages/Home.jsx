import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import RandomFact from '../components/RandomFact'
import SigninForm from '../components/SigninForm'
import RegisterForm from '../components/RegisterForm'

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
            <RegisterForm />
            <SigninForm />
          </>
        )
      }
    </>
  )
}

export default Home