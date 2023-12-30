import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { bringFavs, uploadFav } from '../assets/localStorage'

const WikiFacts = () => {

  const { facts } = useLoaderData()
  
  const [factsList, setFactsList] = useState(facts)
  var [pagCount, setPagCount] = useState(1)
  const [listFavs, setListFavs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("")
  const [filteredList, setFilteredList] = useState(factsList)
  


  // Añadir a favoritos
  function addFavourite(id) {
    const newListFav = filteredList.filter((fact) => {
      return fact === filteredList[id]
    })
    
    const newFav = newListFav[0]
    setListFavs([...listFavs, newFav])
    uploadFav([...listFavs, newFav], "factsFavs")
  }

  function deleteFavourite(objeto) {
    const newListFav = listFavs.filter((item) => {
      return JSON.stringify(item) !== JSON.stringify(objeto)
    })    
    setListFavs(newListFav)
    uploadFav(newListFav, "factsFavs")
  }


  function prevPag() {
    pagCount > 1 && setPagCount(--pagCount)
  }
  function nextPag() {
    pagCount < Math.ceil(filteredList.length/20) && setPagCount(++pagCount)
  }

  useEffect(() => {
    setPagCount(1)
  }, [filter])
  
  

  useEffect(() => {
    setLoading(false)
    setListFavs(bringFavs("factsFavs"))
  }, [])


  function handleFilter(e) {
    setFilter(e.target.value)
    const newList = factsList.filter((item) => {
      return item.fact.toLowerCase().includes(filter.toLowerCase())
    })
    

    // no funciona
    if ( filter === "" ) {
      setFilteredList(factsList)
    } else {
      setFilteredList(newList)
    }
  }


  // Renderizar solo cuando la carga ha terminado
  if (loading) {
    return <p>Loading...</p>
  }


  return (
    <>
      <h1>WikiFacts</h1>
      <input type="text" onChange={ handleFilter } />
      <section className='section-facts'>
        {
          filteredList?.slice((pagCount-1)*20, ((pagCount-1)*20)+20).map((item, index) => {
            return (
            <div key={ item.id }>
              <p id={ item.id }>
                { item.fact }
              </p>
              {
                listFavs.some(obj => JSON.stringify(obj) === JSON.stringify(item)) ? <button onClick={ () => deleteFavourite(item) }>Eliminar de favoritos🌟</button> : <button onClick={ () => addFavourite(item.id) }>Añadir a favoritos⭐</button>
              }
              <Link to={`/facts/${item.id+1}`}>View Fact</Link>
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

export const loaderFacts = async() => {
  const res = await fetch("https://catfact.ninja/facts?limit=332")
  const facts = await res.json()

  const newFactsList = facts.data.map((item, index) => {
    var newObj = { ...item }
    delete newObj["length"]
    newObj.id = index
    return newObj
  })

  const modifiedFacts = newFactsList

  return { facts: modifiedFacts }
}