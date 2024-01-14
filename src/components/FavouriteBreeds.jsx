import React, { useState } from 'react'
import { loadUserLoggedData, uploadNewUsersData } from '../localStorage/localStorage'

const FavouriteBreeds = () => {

  // list of facts favourites
  const [breedsFav, setBreedsFav] = useState(loadUserLoggedData().favs.breeds)
  const [userData, setUserData] = useState(loadUserLoggedData())


  function deleteFavourite(object) {
    const newListFavs = breedsFav.filter((item) => {
      return item.id !== object.id
    })
    
    const newUserData = {
      ...userData,
      favs: {
        facts: userData.favs.facts,
        breeds: newListFavs
      }
    }

    setUserData(newUserData)
    uploadNewUsersData(newUserData)
    setBreedsFav(newListFavs)
  }

  
  return (
    <>
      <h1>Breeds Favourites</h1>
      {
        !breedsFav.length ? <p>No hay breeds guardados en favoritos</p> :
        breedsFav?.map((item, index) => {
          return (
            <div className='main-favourites__section-favourites__breeds-favs' key={ index }>
              <div>
                <p>
                  Breed - { item.breed }
                </p>
                <p>
                  Country - { item.country }
                </p>
                <p>
                  Origin - { item.origin }
                </p>
                <p>
                  Coat - { item.coat }
                </p>
                <p>
                  Pattern - { item.pattern }
                </p>
              </div>
              <button onClick={ () => deleteFavourite(item) }>Delete from favourites</button>
            </div>
          )
        })
      }
    </>
  )
}

export default FavouriteBreeds