import React, { useEffect } from 'react'

const PaginationCount = ({ filter, filteredListLength, pagCount, setPagCount, currentPage, setCurrentPage }) => {

  useEffect(() => {
    setPagCount(1)
    setCurrentPage(1)
  }, [filter])


  // control the state pageCount
  function prevPag() {
    var currentPageState = --pagCount
    pagCount > 0 && (setCurrentPage(currentPageState), setPagCount(currentPageState), document.documentElement.scrollTop = 0)
  }
  function nextPag() {
    var currentPageState = ++pagCount
    pagCount < Math.ceil(filteredListLength/20) && (setCurrentPage(currentPageState), setPagCount(currentPageState), document.documentElement.scrollTop = 0)
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