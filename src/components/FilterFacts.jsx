import React, { useEffect, useState } from 'react'

const FilterFacts = ({ setFilteredList, filter, setFilter, factsList }) => {

  const [filteredListLength, setfilteredListLength] = useState()


  useEffect(() => {
    const newList = factsList.filter((item) => {
      return item.fact.toLowerCase().includes(filter.toLowerCase())
    })
    setFilteredList(newList)
    setfilteredListLength(newList.length)
  }, [filter])


  // change the filter if the input filter data is changed 
  function handleFilter(e) {
    setFilter(e.target.value)
  }


  return (
    <>
      <input className='main-wiki-facts__filter-container__input' type="text" onChange={ handleFilter } placeholder='Find by keywords' />
      {
        filteredListLength === 0 && <p className='main-wiki-facts__filter-container__message' >There is no result for your specifications</p>
      }
    </>
  )
}

export default FilterFacts