import React from 'react'

const FilterFacts = ({ filteredListLength, setFilteredList, filter, setFilter, factsList }) => {

  // change the filter if the input filter data is changed 
  function handleFilter(e) {
    setFilter(e.target.value)
    const newList = factsList.filter((item) => {
      return item.fact.toLowerCase().includes(filter.toLowerCase())
    })
    
    // the filter doesn't work as spected if you delete something sometimes
    setFilteredList(newList)
  }


  return (
    <>
    <input type="text" onChange={ handleFilter } placeholder='Find by keywords' />
    {
      !filteredListLength && <p>There is no result for your specifications</p>
    }
    </>
  )
}

export default FilterFacts