import React, { useContext, useState } from 'react'
import LoginForm from '../components/LoginForm'
import SigninForm from '../components/SigninForm'
import { UserContext } from '../context/userContext'

const Home = () => {

  const { user, setUser } = useContext(UserContext)

  const [randomFact, setRandomFact] = useState()

  async function randomFactGenerator() {
    const res = await fetch("https://catfact.ninja/fact")
    const fact = await res.json()
    setRandomFact(fact.fact)
  }
  


  return (
    <>
      <h1>Home</h1>
      <h1>IMAGEN CON BOTÓN</h1>
      <button onClick={ randomFactGenerator }>Random Fact</button>
      <p>{ randomFact }</p>
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