import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLoaderData, useLocation } from 'react-router-dom'
import { loadUserLoggedData, uploadNewUsersData } from '../localStorage/localStorage'
import { UserContext } from '../context/userContext'
import PaginationCount from '../components/PaginationCount'
import FilterBreeds from '../components/FilterBreeds'

const WikiBreeds = () => {

  // if the user is logged is true else is false
  const { user, setUser } = useContext(UserContext)

  // all the breeds from the API
  const { breeds } = useLoaderData()
  const [breedsList, setBreedsList] = useState(breeds)
  
  // shown list with the filter applied(this list is the actual rendered all the time)
  const [filteredList, setFilteredList] = useState(breedsList)
  
  // list of brreds favourites
  const [listFavs, setListFavs] = useState(loadUserLoggedData().favs.breeds)
  const [userData, setUserData] = useState(loadUserLoggedData())

  const [showButton, setShowButton] = useState(false)
  const showPos = 400

  // email userLogged
  const [emailUserLogger, setEmailUserLogger] = useState(localStorage.getItem("userLoggedEmail")) || ""
  
  // state for the actual page of the pagination
  var [pagCount, setPagCount] = useState(1)
  var [currentPage, setCurrentPage] = useState(1)
  const location = useLocation()

  // control if the user is logged for addFavourites
  const [notRegistered, setNotRegistered] = useState(false)
  const hideMessage = useRef(null)

  // the data of filters while you select the filters
  const [filter, setFilter] = useState({
    breed: "",
    country: "",
    origin: "",
    coat: "",
    pattern: "",
  })

  
  // initial useEffect bring the breeds in favs and setLoading false(not working)
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
      const newListFav = filteredList.filter((breed) => {
        return breed === breedsList[id]
      })
      
      // breed selected
      const newFav = newListFav[0]

      const newUserData = {
        ...userData,
        favs: {
          facts: userData.favs.facts,
          breeds: [...listFavs, newFav]
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
        facts: userData.favs.facts,
        breeds: newListFavs
      }
    }

    setUserData(newUserData)
    uploadNewUsersData(newUserData)
    setListFavs(newListFavs)
  }


  return (
    <main className='main-wiki-breeds'>

      {
        showButton && <a onClick={ upPage } className='main-wiki-breeds__up-page'>⬆</a>
      }

      <h1>WikiBreeds</h1>
      
      <FilterBreeds filter={ filter } setFilter={ setFilter } breeds={ breeds } breedsList={ breedsList } setPagCount={ setPagCount } setFilteredList={ setFilteredList } />
      
      {
        notRegistered && <h3>You have to be registered to save your facts in favourites!</h3>
      }

      <section className='main-wiki-breeds__section-breeds'>
        {
          !filteredList.length ? <p>There is no result for your specifications</p> :
          filteredList?.slice((pagCount-1)*20, ((pagCount-1)*20)+20).map((item) => {
            return (
              <div  className='main-wiki-breeds__section-breeds__container' key={ item.id } id={ item.id }>
                <div className='main-wiki-breeds__section-breeds__container__data-breed'>
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
                <div className='container-buttons'>
                  {
                    (listFavs.some(obj => JSON.stringify(obj) === JSON.stringify(item)) && user) ?
                    <button className='delete-button' onClick={ () => deleteFavourite(item) }>Delete from favourites</button>
                    :
                    <button className='add-button' onClick={ () => addFavourite(item.id) }>Add favourites⭐</button>
                  }
                  <Link className='view' to={`/breeds/${ item.id+1 }`} state={ currentPage } >View Breed</Link>
                </div>
            </div>
            )
          })
        }
      </section>
      <PaginationCount filter={ filter } filteredListLength={ filteredList.length } pagCount={ pagCount } setPagCount={ setPagCount } currentPage={ currentPage } setCurrentPage={ setCurrentPage }/>
    </main>
  )
}


export default WikiBreeds