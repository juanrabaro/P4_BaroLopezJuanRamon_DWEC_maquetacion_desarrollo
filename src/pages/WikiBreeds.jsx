import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { bringFavs, uploadFav } from '../assets/localStorage'

const WikiBreeds = () => {

  const { breeds } = useLoaderData()
  
  const [breedsList, setBreedsList] = useState(breeds.data)
  const [listFavs, setListFavs] = useState([])
  var [pagCount, setPagCount] = useState(1)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(false)
    setListFavs(bringFavs("breedsFavs"))
  }, [])


  function prevPag() {
    pagCount > 1 && setPagCount(--pagCount)
  }
  function nextPag() {
    pagCount < 5 && setPagCount(++pagCount)
  }
  

  // Añadir a favoritos
  function addFavourite(index) {
    const newBreedList = breedsList.filter((breed) => {
      return breed === breedsList[index+((pagCount-1)*20)]
    })
    
    const newFav = newBreedList[0]
    setListFavs([...listFavs, newFav])
    uploadFav([...listFavs, newFav], "breedsFavs")
  }

  function deleteFavourite(objeto) {
    const newBreedList = breedsList.filter((item) => {
      return JSON.stringify(item) !== JSON.stringify(objeto)
    })    
    setListFavs(newBreedList)
    uploadFav(newBreedList, "breedsFavs")
  }
  

  // Renderizar solo cuando la carga ha terminado
  if (loading) {
    return <p>Loading...</p>
  }


  return (
    <>
      <h1>WikiBreeds</h1>
      <section className='section-breeds'>
        {
          loading && <p>Loading...</p>
        }
        {
          breedsList?.slice((pagCount-1)*20, ((pagCount-1)*20)+20).map((item, index) => {
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
              {
                listFavs.some(obj => JSON.stringify(obj) === JSON.stringify(item)) ? <button onClick={ () => deleteFavourite(item) }>Eliminar de favoritos🌟</button> : <button onClick={ () => addFavourite(index) }>Añadir a favoritos⭐</button>
              }
              <Link to={`/breeds/${(index+1)+((pagCount-1)*20)}`}>View Breed</Link>
            </div>
            )
          })
        }
      </section>
      <section className='section-contador-paginacion'>
        <button onClick={ prevPag }>Anterior</button>
        <p>{ pagCount }</p>
        <button onClick={ nextPag }>Siguiente</button>
      </section>
    </>
  )
}


export default WikiBreeds

export const loaderBreeds = async() => {
  const res = await fetch("https://catfact.ninja/breeds?limit=98")
  const breeds = await res.json()
  return { breeds }
}