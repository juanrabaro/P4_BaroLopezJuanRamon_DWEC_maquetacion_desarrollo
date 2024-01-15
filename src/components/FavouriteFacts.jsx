import React, { useState } from 'react'
import { loadUserLoggedData, uploadNewUsersData } from '../localStorage/localStorage'

const FavouriteFacts = () => {

  // list of facts favourites
  const [factsFav, setFactsFav] = useState(loadUserLoggedData().favs.facts)
  const [userData, setUserData] = useState(loadUserLoggedData())



  function deleteFavourite(object) {
    const newListFavs = factsFav.filter((item) => {
      return item.id !== object.id
    })

    const newUserData = {
      ...userData,
      favs: {
        facts: newListFavs,
        breeds: userData.favs.breeds
      }
    }

    setUserData(newUserData)
    uploadNewUsersData(newUserData)
    setFactsFav(newListFavs)
  }


  

  return (
    <>
      <h1>Facts Favourites</h1>
      {
        !factsFav.length ? <p>No hay facts guardados en favoritos</p> :
        factsFav?.map((item, index) => {
          return (
            <div className='main-favourites__section-favourites__facts-favs' key={ index }>
              <p>{ item.fact }</p>
              <button onClick={ () => deleteFavourite(item) }>Delete from favourites</button>
            </div>
          )
        })
      }
    </>
  )
}

export default FavouriteFacts