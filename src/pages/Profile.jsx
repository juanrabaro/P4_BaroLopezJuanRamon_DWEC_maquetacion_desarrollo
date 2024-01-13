import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom'
import { loadUserLoggedData } from '../localStorage/localStorage'

const Profile = () => {

  const { user, setUser } = useContext(UserContext)
  const [dataUser, setDataUser] = useState(loadUserLoggedData())
  const navigate = useNavigate()

  console.log(dataUser);

  useEffect(() => {
    !user && navigate("/")
  }, [])
  

  return (
    <main className='main-profile'>

      <section className='main-profile__container'>
        <h1>Profile</h1>
        
        <div className='main-profile__container__data'>
          <h4>Hello user { dataUser.username }!</h4>
          <h4>Email: { dataUser.email }</h4>
          <h4>Age: { dataUser.age } years</h4>
        </div>

        <LogoutButton setUser={ setUser }/>
      </section>
    </main>
  )
}

export default Profile