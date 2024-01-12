import React, { useEffect, useState } from 'react'
import { bringFavs, loadUserLoggedData, uploadFav } from '../localStorage/localStorage'

const FavouriteBreeds = () => {

  // list of facts favourites
  const [breedsFav, setBreedsFav] = useState([])


  // Bring the data of facts favourites in localStorage
  useEffect(() => {
    setBreedsFav(loadUserLoggedData().favs.breeds)
  }, [])


  function deleteFavourite(object) {
    const newBreedList = breedsFav.filter((item) => {
      return item.id !== object.id
    })
    setBreedsFav(newBreedList)
    uploadFav(newBreedList, "breedsFavs")
  }

  
  return (
    <>
      <h2>Breeds favoritos</h2>
      {
        !breedsFav.length ? <p>No hay breeds guardados en favoritos</p> :
        breedsFav?.map((item, index) => {
          return (
            <div key={ index }>
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
              <button onClick={ () => deleteFavourite(item) }>Delete from favourites🛑</button>
            </div>
          )
        })
      }
    </>
  )
}

export default FavouriteBreeds