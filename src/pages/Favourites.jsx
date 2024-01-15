import React, { useContext, useEffect, useState } from 'react'
import FavouriteFacts from '../components/FavouriteFacts'
import FavouriteBreeds from '../components/FavouriteBreeds'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const Favourites = () => {

  // user is logged?
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  // change between facts and breeds
  const [factOrBreed, setFactOrBreed] = useState("fact")



  useEffect(() => {
    !user && navigate("/")
  }, [])
  



  // change the content based on the button you click
  function handleChange(e) {
    const idButton = e.target.id

    if (idButton === "button-breeds" && factOrBreed === "fact") {
      setFactOrBreed("breed")
    } else if (idButton === "button-facts" && factOrBreed === "breed") {
      setFactOrBreed("fact")
    }
  }




  
  return (
    <main className='main-favourites'>
      <h1 className='main-favourites__h1-favourites'>Favourites</h1>
      <section className='main-favourites__section-buttons-favourites'>
        <button id='button-facts' onClick={ handleChange }>Facts</button>
        <button id='button-breeds' onClick={ handleChange }>Breeds</button>
      </section>
      <section className='main-favourites__section-favourites'>
        {
          factOrBreed === "fact" ? (
            <>
              <FavouriteFacts />
            </>
          )
          : (
            <>
              <FavouriteBreeds />
            </>
          )
        }
      </section>
    </main>
  )
}

export default Favourites