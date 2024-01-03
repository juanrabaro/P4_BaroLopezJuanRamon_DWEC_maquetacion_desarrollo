import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { bringFavs, uploadFav } from '../assets/localStorage'

const WikiBreeds = () => {

  const { breeds } = useLoaderData()
  
  const [breedsList, setBreedsList] = useState(breeds)
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
  function addFavourite(id) {
    const newBreedList = breedsList.filter((breed) => {
      return breed === breedsList[id]
    })
    
    const newFav = newBreedList[0]
    setListFavs([...listFavs, newFav])
    uploadFav([...listFavs, newFav], "breedsFavs")
  }

  function deleteFavourite(object) {
    const newBreedList = listFavs.filter((item) => {
      return item.id !== object.id
    })
    setListFavs(newBreedList)
    uploadFav(newBreedList, "breedsFavs")
  }


  return (
    <>
      <h1>WikiBreeds</h1>
      <section className='section-breeds'>
        {
          loading && <p>Loading...</p>
        }
        {
          breedsList?.slice((pagCount-1)*20, ((pagCount-1)*20)+20).map((item) => {
            return (
            <div key={ item.id } id={ item.id }>
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
                listFavs.some(obj => JSON.stringify(obj) === JSON.stringify(item)) ? <button onClick={ () => deleteFavourite(item) }>Eliminar de favoritos🌟</button> : <button onClick={ () => addFavourite(item.id) }>Añadir a favoritos⭐</button>
              }
              <Link to={`/breeds/${ item.id+1 }`}>View Breed</Link>
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
  const newBreedsList = breeds.data.map((item, index) => {
    var newObj = { ...item }
    newObj.id = index
    return newObj
  })

  const modifiedBreeds = newBreedsList

  return { breeds: modifiedBreeds }
}