import React, { useEffect } from 'react'

const FilterBreeds = ({ filter, setFilter, breeds, breedsList, setPagCount, setFilteredList }) => {

  // List for the selects(filters)
  var posiblyBreedList = []
  var posiblyCountryList = []
  var posiblyOriginList = []
  var posiblyCoatList = []
  var posiblyPatternList = []
  // All the posibilities of all the atributes
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
  // Sort alphabetically the lists
  posiblyBreedList = posiblyBreedList.sort()
  posiblyCountryList = posiblyCountryList.sort()
  posiblyOriginList = posiblyOriginList.sort()
  posiblyCoatList = posiblyCoatList.sort()
  posiblyPatternList = posiblyPatternList.sort()


  // refresh the state filter with the data of the filters
  function handleChange(e) {
    const { value, name } = e.target
    setFilter({
      ...filter,
      [name]: value
    })
  }


  // which data is rendered using the state filter
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
    </>
  )
}

export default FilterBreeds