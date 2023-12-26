import React, { useEffect, useState } from 'react'

const WikiFacts = () => {
  
  const [factsList, setFactsList] = useState([])
  const [fav, setFav] = useState(false)
  var [pagCount, setPagCount] = useState(1)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const url = "https://catfact.ninja/facts?limit=332"
    fetch(url)
      .then(res => res.json())
      .then(data => setFactsList(data.data))
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
    pagCount < 17 && setPagCount(++pagCount)
  }
  



  return (
    <>
      <h1>WikiFacts</h1>
      <section className='section-facts'>
        {
          loading && <p>Loading...</p>
        }
        {
          factsList?.slice((pagCount-1)*20, ((pagCount-1)*20)+20).map((item, index) => {
            return (
            <div key={ index }>
              <p>
                { item.fact }
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

export default WikiFacts