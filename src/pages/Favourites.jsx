import React, { useEffect, useState } from 'react'
import { bringFavs } from '../assets/localStorage/localStorage'

const Favourites = () => {

  // Traer del localStorage los facts y breeds favoritos y cargarlos en estos estados
  const [factsFav, setFactsFav] = useState([])
  const [breedsFav, setBreedsFav] = useState([])

  // Cargar aqui⬇️ los estados⬆️
  useEffect(() => {
    setBreedsFav(bringFavs("breedsFavs"))
    setFactsFav(bringFavs("factsFavs"))
  }, [])
  

  // Para el cambio de ver los facts favoritos o los breeds favoritos
  const [factOrBreed, setFactOrBreed] = useState("fact")

  function handleChange(e) {
    const idButton = e.target.id

    if (idButton === "button-breeds" && factOrBreed === "fact") {
      setFactOrBreed("breed")
    } else if (idButton === "button-facts" && factOrBreed === "breed") {
      setFactOrBreed("fact")
    }
  }


  return (
    <>
      <h1 className='h1-favourites'>Favourites</h1>
      <section className='section-buttons-favourites'>
        <button id='button-facts' onClick={ handleChange }>Facts</button>
        <button id='button-breeds' onClick={ handleChange }>Breeds</button>
      </section>
      <section className='section-favourites'>
        {
          factOrBreed === "fact" ? (
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
          : (
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
      </section>
    </>
  )
}

export default Favourites