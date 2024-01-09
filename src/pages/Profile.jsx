import React, { useState } from 'react'

const Profile = () => {


  const [dataUser, setDataUser] = useState(JSON.parse(localStorage.getItem("userLoggedData")))


  return (
    <>
      <h1>Profile</h1>
      {
        <h4>Hello user with email: { dataUser.email }</h4>
      }
    </>
  )
}

export default Profile