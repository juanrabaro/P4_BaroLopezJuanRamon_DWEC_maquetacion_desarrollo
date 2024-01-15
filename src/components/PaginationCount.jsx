/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'

const PaginationCount = ({ filter, filteredListLength, pagCount, setPagCount, currentPage, setCurrentPage }) => {

  useEffect(() => {
    setPagCount(1)
    setCurrentPage(1)
  }, [filter])



  // control the state pageCount
  function prevPag() {
    pagCount > 1 && (setCurrentPage(pagCount-1), setPagCount(pagCount-1), document.documentElement.scrollTop = 0)
  }
  function nextPag() {
    pagCount < Math.ceil(filteredListLength/20) && (setCurrentPage(pagCount+1), setPagCount(pagCount+1), document.documentElement.scrollTop = 0)
  }
  

  

  return (
    <section className='section-contador-paginacion'>
        <button onClick={ prevPag }>Anterior</button>
        <p><strong>{ pagCount }</strong></p>
        <button onClick={ nextPag }>Siguiente</button>
      </section>
  )
}

export default PaginationCount