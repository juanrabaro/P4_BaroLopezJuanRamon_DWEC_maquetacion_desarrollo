import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import LogoutButton from './LogoutButton'

const NavBar = () => {

  // user is logged?
  const { user, setUser } = useContext(UserContext)

  
  return (
    <header>
      <img src="/logo.png" alt="logo image" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/facts">Wiki Facts</Link>
        <Link to="/breeds">Wiki Breeds</Link>
        {
          user && <Link to="/favourites">Favourites</Link>
        }
        <Link to="/contact">Contact</Link>
        {
          !user && (
            <>
              <Link to="/signin">Sign In</Link>
              <Link to="/register">Register</Link>
            </>
          )
        }
        {
          user && (
            <>
              <Link to="/profile">Profile</Link>
              <LogoutButton setUser={ setUser }/>
            </>
          )
        }
      </nav>
    </header>
  )
}

export default NavBar