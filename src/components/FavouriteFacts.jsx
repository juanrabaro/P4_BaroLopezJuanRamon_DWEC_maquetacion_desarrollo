import React, { useEffect, useState } from 'react'
import { bringFavs } from '../localStorage/localStorage'

const FavouriteFacts = () => {

  const [factsFav, setFactsFav] = useState([])  
  
  // Bring the data of facts and breeds favourites in localStorage
  useEffect(() => {
    setFactsFav(bringFavs("factsFavs"))
  }, [])
  

  return (
    <>
      <h2>Facts favoritos</h2>
      {
        !factsFav.length ? <p>No hay facts guardados en favoritos</p> :
        factsFav?.map((item, index) => {
          return <p key={ index }>{ item.fact }</p>
        })
      }
    </>
  )
}

export default FavouriteFacts