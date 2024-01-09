import React, { useEffect, useState } from 'react'
import { bringFavs } from '../localStorage/localStorage'

const FavouriteBreeds = () => {

  const [breedsFav, setBreedsFav] = useState([])

  useEffect(() => {
    setBreedsFav(bringFavs("breedsFavs"))
  }, [])
  
  return (
    <>
      <h2>Breeds favoritos</h2>
      {
        !breedsFav.length ? <p>No hay breeds guardados en favoritos</p> :
        breedsFav?.map((item, index) => {
          return (
            <div key={ index }>
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
          )
        })
      }
    </>
  )
}

export default FavouriteBreeds