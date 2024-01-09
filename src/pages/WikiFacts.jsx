import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { bringFavs, uploadFav } from '../localStorage/localStorage'
import { UserContext } from '../context/userContext'
import PaginationCount from '../components/PaginationCount'
import FilterFacts from '../components/FilterFacts'

const WikiFacts = () => {

  // user logged?
  const { user, setUser } = useContext(UserContext)

  // all the facts from the API
  const { facts } = useLoaderData()
  const [factsList, setFactsList] = useState(facts)
  
  // shown list with the filter applied(this list is the actual rendered all the time)
  const [filteredList, setFilteredList] = useState(factsList)
  
  // filter for the search filter
  const [filter, setFilter] = useState("")

  // state for the actual page of the pagination
  var [pagCount, setPagCount] = useState(1)

  // list of breeds favourites
  const [listFavs, setListFavs] = useState([])

  // loading message while the data is not ready(not working)
  const [loading, setLoading] = useState(true)

  // control if the user is logged for addFavourites
  const [notRegistered, setNotRegistered] = useState(false)
  const hideMessage = useRef(null)
  

  // initial useEffect bring the breeds in favs and setLoading false(not working)
  useEffect(() => {
    setLoading(false)
    setListFavs(bringFavs("factsFavs"))
  }, [])


  function addFavourite(id) {
    // si el usuario está registrado puede guardar en favs
    if ( user ) {
      const newListFav = filteredList.filter((fact) => {
        return fact === factsList[id]
      })

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
      return item.id !== object.id
    })    
    setListFavs(newListFav)
    uploadFav(newListFav, "factsFavs")
  }


  return (
    <>
      <h1>WikiFacts</h1>
      {
        notRegistered && <p>You have to be registered to save your facts in favourites!</p>
      }

      <FilterFacts filteredListLength={ filteredList.length } setFilteredList={ setFilteredList } filter={ filter } setFilter={ setFilter } factsList={ factsList } />
      
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
                <button onClick={ () => deleteFavourite(item) }>Delete from favourites🛑</button> 
                :
                <button onClick={ () => addFavourite(item.id) }>Add favourites⭐</button>
              }
              <Link to={`/facts/${item.id+1}`}>View Fact</Link>
            </div>
            )
          })
        }
      </section>

      <PaginationCount filter={ filter } filteredListLength={ filteredList.length } pagCount={ pagCount } setPagCount={ setPagCount }/>
    
    </>
  )
}

export default WikiFacts