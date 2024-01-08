import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { bringFavs, uploadFav } from '../assets/localStorage/localStorage'
import { UserContext } from '../context/userContext'

const WikiFacts = () => {

  const { facts } = useLoaderData()
  const { user, setUser } = useContext(UserContext)
  
  const [factsList, setFactsList] = useState(facts)
  var [pagCount, setPagCount] = useState(1)
  const [listFavs, setListFavs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("")
  const [filteredList, setFilteredList] = useState(factsList)
  const [notRegistered, setNotRegistered] = useState(false)
  const hideMessage = useRef(null)
  


  // Añadir a favoritos
  function addFavourite(id) {
    // si el usuario está registrado puede guardar en favs
    if ( user ) {
      const newListFav = filteredList.filter((fact) => {
        return fact === factsList[id]
      })
      //console.log(id)
      //console.log(newListFav)
      console.log(newListFav[0])
      const newFav = newListFav[0]

      uploadFav([...listFavs, newFav], "factsFavs")
      setListFavs([...listFavs, newFav])
      return
    }

    // si el usuario no está registrado no puede guardar en favs
    setNotRegistered(true)
    if (hideMessage.current) {
      clearTimeout(hideMessage.current)
    }
    hideMessage.current = setTimeout(() => {
      setNotRegistered(false)
    }, 2000)
  }

  function deleteFavourite(object) {
    const newListFav = listFavs.filter((item) => {
      return JSON.stringify(item) !== JSON.stringify(object)
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
    

    // no funciona bien cuando se borran caracteres del filtro pero en general funciona el filtro
    if ( filter === "" ) {
      setFilteredList(factsList)
    } else {
      setFilteredList(newList)
    }
  }


  return (
    <>
      <h1>WikiFacts</h1>
      {
        notRegistered && <p>You have to be registered to save your facts in favourites!</p>
      }
      <input type="text" onChange={ handleFilter } placeholder='Find by keywords' />
      {
        !filteredList.length && <p>There is no result for your specifications</p>
      }
      <section className='section-facts'>
        {
          loading && <p>Loading...</p>
        }
        {
          filteredList?.slice((pagCount-1)*20, ((pagCount-1)*20)+20).map((item) => {
            return (
            <div key={ item.id }>
              <p id={ item.id }>
                { item.fact }
              </p>
              {
                (listFavs.some(obj => JSON.stringify(obj) === JSON.stringify(item)) && user) ?
                <button onClick={ () => deleteFavourite(item) }>Eliminar de favoritos🌟</button> 
                :
                <button onClick={ () => addFavourite(item.id) }>Añadir a favoritos⭐</button>
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