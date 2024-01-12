import React, { useEffect, useState } from 'react'
import { bringFavs, loadUserLoggedData, uploadFav } from '../localStorage/localStorage'

const FavouriteFacts = () => {

  // list of facts favourites
  const [factsFav, setFactsFav] = useState([])  
  

  // Bring the data of facts favourites in localStorage
  useEffect(() => {
    setFactsFav(loadUserLoggedData().favs.facts)
  }, [])
  

  function deleteFavourite(object) {
    const newBreedList = factsFav.filter((item) => {
      return item.id !== object.id
    })
    setFactsFav(newBreedList)
    uploadFav(newBreedList, "factsFavs")
  }


  return (
    <>
      <h2>Facts favoritos</h2>
      {
        !factsFav.length ? <p>No hay facts guardados en favoritos</p> :
        factsFav?.map((item, index) => {
          return (
            <div key={ index }>
              <p>{ item.fact }</p>
              <button onClick={ () => deleteFavourite(item) }>Delete from favourites🛑</button>
            </div>
          )
        })
      }
    </>
  )
}

export default FavouriteFacts