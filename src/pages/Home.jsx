import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import RandomFact from '../components/RandomFact'
import SigninForm from '../components/SigninForm'
import RegisterForm from '../components/RegisterForm'

const Home = () => {

  // user logged?
  const { user, setUser } = useContext(UserContext)


  return (
    <main className='main-home'>

      <h1>Cat Facts</h1>

      <img className='main-home__home-image' src="/public/img/imagenPrincipal.png" alt="main image" />
      <div className='main-home__random-div'>
        <RandomFact/>
      </div>
        {
          !user && (
            <>
            <div className='main-home__forms'>
              <RegisterForm />
              <SigninForm />
            </div>
            </>
          )
        }
    </main>
  )
}

export default Home