import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom'
import { loadUserLoggedData } from '../localStorage/localStorage'

const Profile = () => {

  // user is logged?
  const { user, setUser } = useContext(UserContext)

  // obj with the data of the current logged user
  const [dataUser, setDataUser] = useState(loadUserLoggedData())
  const navigate = useNavigate()




  useEffect(() => {
    !user && navigate("/")
  }, [])
  


  

  return (
    <main className='main-profile'>

      <section className='main-profile__container'>
        <h1>Profile</h1>
        
        <div className='main-profile__container__data'>
          <h4>Hello user <strong>{ dataUser.username }</strong>!</h4>
          <h4>Email: <strong>{ dataUser.email }</strong></h4>
          <h4>Age: <strong>{ dataUser.age } years</strong></h4>
        </div>

        <LogoutButton setUser={ setUser }/>
      </section>
    </main>
  )
}

export default Profile