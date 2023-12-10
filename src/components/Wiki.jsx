import React, { useState, useEffect } from "react"

function Wiki() {

  const [isMounted, setIsMounted] = useState(false);

  var [count, setCount] = useState(1)
  var [pageCount, setPageCount] = useState(1)

  const [fetchData, setFetchData] = useState([])
  const [fetchData2, setFetchData2] = useState([])
  const [segundoFetchInicio, setSegundoFetchInicio] = useState(false)
  const [segundoFetch, setSegundoFetch] = useState(false)
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    fetch(`https://catfact.ninja/facts?page=${count}`)
      .then((response) => response.json())
      .then((dataObject) => setFetchData(dataObject.data))
      .finally(() => setSegundoFetchInicio(true))
  }, [])
  useEffect(() => {
    fetch(`https://catfact.ninja/facts?page=${count + 1}`)
      .then((response) => response.json())
      .then((dataObject) => setFetchData2(dataObject.data))
      .finally(() => setLoading(false))
  }, [segundoFetchInicio])
  

  useEffect(() => {
    setIsMounted(true)
    if ( isMounted ) {
      setLoading(true)
      console.log("contador cambiado")
      fetch(`https://catfact.ninja/facts?page=${ count }`)
        .then((response) => response.json())
        .then((dataObject) => setFetchData(dataObject.data))
        .finally(() => setLoading(true))
      fetch(`https://catfact.ninja/facts?page=${ count + 1 }`)
        .then((response) => response.json())
        .then((dataObject) => setFetchData2(dataObject.data))
        .finally(() => setLoading(false))
    }
  }, [count])


  function previousPage() {
    if ( count > 1 ) {
      var newCount = count - 2
      setCount(newCount)
      setPageCount(--pageCount)
    }
  }
  function nextPage() {
    if ( count < 33 ) {
      var newCount = count + 2
      setCount(newCount)
      setPageCount(++pageCount)
    }
  }

  return(
    <main className="main-wiki">
      <h1 className="main-wiki__tittle">WIKI</h1>
      {
        loading && <p className="main-wiki__loading">Loading...</p>
      }
      <ul>
        {
          fetchData?.map((factObject, index) => {
            return (
              <li key={ index }>🔵 { factObject.fact }</li>
            )
          })
        }
        {
          fetchData2?.map((factObject, index) => {
            return (
              <li key={ index }>🔵 { factObject.fact }</li>
            )
          })
        }
      </ul>
      <div className="main-wiki__botones-paginacion">
        <button onClick={ previousPage }>⬅️Anterior</button>
        <p>{ pageCount }</p>
        <button onClick={ nextPage }>Siguiente➡️</button>
      </div>
    </main>
  )
}

export default Wiki