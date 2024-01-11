import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { bringFavs, uploadFav } from '../localStorage/localStorage'
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
  
  // list of breeds favourites
  const [listFavs, setListFavs] = useState([])

  const [showButton, setShowButton] = useState(false)
  const showPos = 400

  // email userLogged
  const [emailUserLogger, setEmailUserLogger] = useState(localStorage.getItem("userLoggedData")) || " "
  
  // state for the actual page of the pagination
  var [pagCount, setPagCount] = useState(1)
  
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
    setListFavs(bringFavs("breedsFavs"))

    const handleScroll = () => {
      const scrollPos = document.documentElement.scrollTop
      
      scrollPos > showPos ?
      setShowButton(true)
      :
      setShowButton(false)
    }
    window.addEventListener('scroll', handleScroll)
  }, [])


  function upPage() {
    document.documentElement.scrollTop = 0
  }


  function addFavourite(id) {
    // user is registered so save the data to localStorage
    if ( user ) {
      const newBreedList = breedsList.filter((breed) => {
        return breed === breedsList[id]
      })
      
      const newFav = newBreedList[0]
      setListFavs([...listFavs, newFav])
      uploadFav([...listFavs, newFav], "breedsFavs")
      return
    }

    // not registered so enable for 2 sec the message
    setNotRegistered(true)
    if (hideMessage.current) {
      clearTimeout(hideMessage.current)
    }
    hideMessage.current = setTimeout(() => {
      setNotRegistered(false)
    }, 2000)
  }

  function deleteFavourite(object) {
    const newBreedList = listFavs.filter((item) => {
      return item.id !== object.id
    })
    setListFavs(newBreedList)
    uploadFav(newBreedList, "breedsFavs")
  }


  return (
    <main className='main-wiki-breeds'>

      {
        showButton && <a onClick={ upPage } className='main-wiki-breeds__up-page'>⬆️</a>
      }

      <h1>WikiBreeds</h1>
      {
        notRegistered && <h3>You have to be registered to save your facts in favourites!</h3>
      }
      <FilterBreeds filter={ filter } setFilter={ setFilter } breeds={ breeds } breedsList={ breedsList } setPagCount={ setPagCount } setFilteredList={ setFilteredList } />

      <section className='main-wiki-breeds__section-breeds'>
        {
          !filteredList.length ? <p>There is no result for your specifications</p> :
          filteredList?.slice((pagCount-1)*20, ((pagCount-1)*20)+20).map((item) => {
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
                (listFavs.some(obj => JSON.stringify(obj) === JSON.stringify(item)) && user) ?
                <button onClick={ () => deleteFavourite(item) }>Delete from favourites🛑</button>
                :
                <button onClick={ () => addFavourite(item.id) }>Add favourites⭐</button>
              }
              <Link to={`/breeds/${ item.id+1 }`}>View Breed</Link>
            </div>
            )
          })
        }
      </section>
      <PaginationCount filter={ filter } filteredListLength={ filteredList.length } pagCount={ pagCount } setPagCount={ setPagCount }/>
    </main>
  )
}


export default WikiBreeds