import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { bringFavs, uploadFav } from '../assets/localStorage/localStorage'
import { UserContext } from '../context/userContext'

const WikiBreeds = () => {

  const { breeds } = useLoaderData()
  const { user, setUser } = useContext(UserContext)
  
  const [breedsList, setBreedsList] = useState(breeds)
  const [listFavs, setListFavs] = useState([])
  var [pagCount, setPagCount] = useState(1)
  const [loading, setLoading] = useState(true)
  const [filteredList, setFilteredList] = useState(breedsList)
  const [notRegistered, setNotRegistered] = useState(false)
  const hideMessage = useRef(null)
  const [filter, setFilter] = useState({
    breed: "",
    country: "",
    origin: "",
    coat: "",
    pattern: "",
  })

  // Listas para selects filtros
  var posiblyBreedList = []
  var posiblyCountryList = []
  var posiblyOriginList = []
  var posiblyCoatList = []
  var posiblyPatternList = []
  // Todas las posibilidades de todos los atributos
  breeds.forEach((breedObject) => {
    if (!posiblyBreedList.includes(breedObject.breed) && breedObject.breed !== ""){
      posiblyBreedList.push(breedObject.breed)
    }
    if (!posiblyCountryList.includes(breedObject.country) && breedObject.country !== ""){
      posiblyCountryList.push(breedObject.country)
    }
    if (!posiblyOriginList.includes(breedObject.origin) && breedObject.origin !== ""){
      posiblyOriginList.push(breedObject.origin)
    }
    if (!posiblyCoatList.includes(breedObject.coat) && breedObject.coat !== ""){
      posiblyCoatList.push(breedObject.coat)
    }
    if (!posiblyPatternList.includes(breedObject.pattern) && breedObject.pattern !== ""){
      posiblyPatternList.push(breedObject.pattern)
    }
  })
  // Ordenar alfabéticamente
  posiblyBreedList = posiblyBreedList.sort()
  posiblyCountryList = posiblyCountryList.sort()
  posiblyOriginList = posiblyOriginList.sort()
  posiblyCoatList = posiblyCoatList.sort()
  posiblyPatternList = posiblyPatternList.sort()

  useEffect(() => {
    setLoading(false)
    setListFavs(bringFavs("breedsFavs"))
  }, [])


  // control the page
  function prevPag() {
    pagCount > 1 && setPagCount(--pagCount)
  }
  function nextPag() {
    pagCount < Math.ceil(filteredList.length/20) && setPagCount(++pagCount)
  }
  

  // Añadir a favoritos
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


  function handleChange(e) {
    const { value, name } = e.target
    setFilter({
      ...filter,
      [name]: value
    })
  }

  useEffect(() => {
    setFilteredList(breedsList.filter((item) => {
      var flag = true

      /*
        Por ejemplo si el breed que has seleccionado en el select(filter.breed) no es igual
        al del item actual del bucle(item.breed) o si el filtro está en deffault entonces
        ese item no vale puesto que no cumple con la condicion de breed por lo cual no es válida,
        esto se hace con todas las posibles categorias y así se van descartando los objetos 1 a 1
        para sacar solo los que realmente encajen
      */
      flag = (filter.breed !== "" && filter.breed !== item.breed) ? false : flag
      flag = (filter.origin !== "" && filter.origin !== item.origin) ? false : flag
      flag = (filter.country !== "" && filter.country !== item.country) ? false : flag
      flag = (filter.coat !== "" && filter.coat !== item.coat) ? false : flag
      flag = (filter.pattern !== "" && filter.pattern !== item.pattern) ? false : flag


      if ( flag ) {
        return item
      }
    }))
    setPagCount(1)
  }, [filter])


  return (
    <>
      <h1>WikiBreeds</h1>
      {
        notRegistered && <p>You have to be registered to save your facts in favourites!</p>
      }
      <select name='breed' onChange={ handleChange }>
        <option value="">Breed</option>
        {
          posiblyBreedList.map((item, index) => {
            return <option key={ index } value={ item }>{ item }</option>
          })
        }
      </select>
      <select name='country' onChange={ handleChange }>
        <option value="">Country</option>
        {
          posiblyCountryList.map((item, index) => {
            return <option key={ index } value={ item }>{ item }</option>
          })
        }
      </select>
      <select name='origin' onChange={ handleChange }>
        <option value="">Origin</option>
        {
          posiblyOriginList.map((item, index) => {
            return <option key={ index } value={ item }>{ item }</option>
          })
        }
      </select>
      <select name='coat' onChange={ handleChange }>
        <option value="">Coat</option>
        {
          posiblyCoatList.map((item, index) => {
            return <option key={ index } value={ item }>{ item }</option>
          })
        }
      </select>
      <select name='pattern' onChange={ handleChange }>
        <option value="">Pattern</option>
        {
          posiblyPatternList.map((item, index) => {
            return <option key={ index } value={ item }>{ item }</option>
          })
        }
      </select>
      <section className='section-breeds'>
        {
          loading && <p>Loading...</p>
        }
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
                <button onClick={ () => deleteFavourite(item) }>Eliminar de favoritos🌟</button>
                :
                <button onClick={ () => addFavourite(item.id) }>Añadir a favoritos⭐</button>
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