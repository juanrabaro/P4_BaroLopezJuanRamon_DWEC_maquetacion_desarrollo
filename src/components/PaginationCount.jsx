import React, { useEffect } from 'react'

const PaginationCount = ({ filter, filteredListLength, pagCount, setPagCount }) => {


  useEffect(() => {
    setPagCount(1)
  }, [filter])

  // control the state pageCount
  function prevPag() {
    pagCount > 1 && setPagCount(--pagCount)
  }
  function nextPag() {
    pagCount < Math.ceil(filteredListLength/20) && setPagCount(++pagCount)
  }


  return (
    <section className='section-contador-paginacion'>
        <button onClick={ prevPag }>Anterior</button>
        <p>{ pagCount }</p>
        <button onClick={ nextPag }>Siguiente</button>
      </section>
  )
}

export default PaginationCount