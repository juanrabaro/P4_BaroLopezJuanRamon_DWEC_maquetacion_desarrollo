import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const NavBar = () => {

  const { user, setUser } = useContext(UserContext)
  
  const navigate = useNavigate()

  function logout() {
    setUser(false)
    localStorage.setItem("userLogged", false)
    navigate("/")
  }



  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/facts">Wiki Facts</Link>
        <Link to="/breeds">Wiki Breeds</Link>
        {
          user && <Link to="/favourites">Favourites</Link>
        }
        {
          !user && (
            <>
              <Link to="/signin">Sign In</Link>
              <Link to="/login">Log in</Link>
            </>
          )
        }
        {
          user && (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={ logout }>Logout</button>
            </>
          )
        }
      </nav>
    </header>
  )
}

export default NavBar