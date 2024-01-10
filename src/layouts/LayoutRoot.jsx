import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { UserContext } from '../context/userContext'

const LayoutRoot = () => {

  const { user, setUser } = useContext(UserContext)

  // Cuando actualizo en Profile no da tiempo a setear el user a true por lo cual
  // nos manda a Home pero al final acaba poniendo user a true entonces todo funciona
  // Intento de solución ⬇️
  useEffect(() => {
    async function getInitialUserLogged() {
      const userLogged = await JSON.parse(localStorage.getItem("userLogged")) || false
      return userLogged
    }
    const userLogged = getInitialUserLogged()
    userLogged ? setUser(true) : setUser(false)
  }, [])


  return (
    <>
      <NavBar />
      {/*<main>*/}
      <Outlet />
      {/*</main>*/}
      <Footer />
    </>
  )
}

export default LayoutRoot