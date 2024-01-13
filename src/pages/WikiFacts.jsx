import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLoaderData, useLocation } from 'react-router-dom'
import { loadUserLoggedData, uploadNewUsersData } from '../localStorage/localStorage'
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
  var [currentPage, setCurrentPage] = useState(1)
  const location = useLocation()
  
  // list of facts favourites
  const [listFavs, setListFavs] = useState(loadUserLoggedData().favs.facts)
  const [userData, setUserData] = useState(loadUserLoggedData())
  
  // control if the user is logged for addFavourites
  const [notRegistered, setNotRegistered] = useState(false)
  const hideMessage = useRef(null)
  
  const [showButton, setShowButton] = useState(false)
  const showPos = 400
  
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = document.documentElement.scrollTop
      
      scrollPos > showPos ?
      setShowButton(true)
      :
      setShowButton(false)
    }
    window.addEventListener('scroll', handleScroll)

    location.state >= 1 && (setPagCount(location.state), setCurrentPage(location.state))
  }, [])
  
  
  function upPage() {
    document.documentElement.scrollTop = 0
  }

  
  function addFavourite(id) {
    // si el usuario está registrado puede guardar en favs
    if ( user ) {
      const newListFav = filteredList.filter((fact) => {
        return fact === factsList[id]
      })
      
      // fact selected
      const newFav = newListFav[0]

      const newUserData = {
        ...userData,
        favs: {
          facts: [...listFavs, newFav],
          breeds: userData.favs.breeds
        }
      }

      setUserData(newUserData)
      uploadNewUsersData(newUserData)
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
    const newListFavs = listFavs.filter((item) => {
      return item.id !== object.id
    })

    const newUserData = {
      ...userData,
      favs: {
        facts: newListFavs,
        breeds: userData.favs.breeds
      }
    }

    setUserData(newUserData)
    uploadNewUsersData(newUserData)
    setListFavs(newListFavs)
  }
  
  
  return (
    <main className='main-wiki-facts'>
      
      {
        showButton && <a onClick={ upPage } className='main-wiki-facts__up-page'>⬆️</a>
      }

      <h1>Wiki Facts</h1>
      <div className='main-wiki-facts__filter-container'>
        <FilterFacts setFilteredList={ setFilteredList } filter={ filter } setFilter={ setFilter } factsList={ factsList } />
      </div>
      {
        notRegistered && <h3 className='main-wiki-facts__message'>You have to be registered to save your facts in favourites!</h3>
      }
      
      <section className='main-wiki-facts__section-facts'>
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
              <Link to={`/facts/${ item.id+1 }`} state={ currentPage } >View Fact</Link>
            </div>
            )
          })
        }
      </section>


      <PaginationCount filter={ filter } filteredListLength={ filteredList.length } pagCount={ pagCount } setPagCount={ setPagCount } currentPage={ currentPage } setCurrentPage={ setCurrentPage }/>

    </main>
  )
}

export default WikiFacts