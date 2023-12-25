import React, { useEffect, useState } from 'react'

const WikiBreeds = () => {

  const [breedsList, setBreedsList] = useState([])
  const [fav, setFav] = useState(false)
  var [pagCount, setPagCount] = useState(1)


  useEffect(() => {
    const url = "https://catfact.ninja/breeds?limit=98"
    fetch(url)
      .then(res => res.json())
      .then(data => setBreedsList(data.data))
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
    pagCount < 17 && setPagCount(++pagCount)
  }
  

  useEffect(() => {
    

  }, [pagCount])
  


  return (
    <>
      <h1>WikiBreeds</h1>
      <section className='section-breeds'>
        {
          breedsList?.map((item, index) => {
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