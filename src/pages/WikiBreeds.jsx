import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const WikiBreeds = () => {

  const [breedsList, setBreedsList] = useState([])
  const [fav, setFav] = useState(false)
  var [pagCount, setPagCount] = useState(1)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const url = "https://catfact.ninja/breeds?limit=98"
    fetch(url)
      .then(res => res.json())
      .then(data => setBreedsList(data.data))
    setLoading(false)
  }, [])
  

  // Añadir a favoritos no implementado
  function handleClick(e) {
    const { textContent } = e.target
    console.log(textContent)
    textContent === "Añadir a favoritos⭐" ? 
    setFav(true)
    :
    setFav(false)
  }


  function prevPag() {
    pagCount > 1 && setPagCount(--pagCount)
  }
  function nextPag() {
    pagCount < 5 && setPagCount(++pagCount)
  }
  

  useEffect(() => {
    

  }, [pagCount])
  


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
                fav ? <button id='added' onClick={ handleClick }>Añadido a favoritos🌟</button> : <button id='add' onClick={ handleClick }>Añadir a favoritos⭐</button>
              }
              <Link to={`/breeds/${(index+1)+((pagCount-1)*20)}`}>View Fact</Link>
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