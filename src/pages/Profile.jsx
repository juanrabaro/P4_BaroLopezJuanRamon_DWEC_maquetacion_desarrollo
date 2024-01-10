import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const { user, setUser } = useContext(UserContext)
  const [dataUser, setDataUser] = useState(localStorage.getItem("userLoggedData"))
  const navigate = useNavigate()


  useEffect(() => {
    !user && navigate("/")
  }, [])
  

  return (
    <>
      <h1>Profile</h1>
      {
        <h4>Hello user with email: { dataUser }</h4>
      }
      <LogoutButton setUser={ setUser }/>
    </>
  )
}

export default Profile