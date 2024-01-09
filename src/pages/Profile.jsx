import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import LogoutButton from '../components/LogoutButton'

const Profile = () => {

  const { user, setUser } = useContext(UserContext)
  const [dataUser, setDataUser] = useState(localStorage.getItem("userLoggedData"))


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