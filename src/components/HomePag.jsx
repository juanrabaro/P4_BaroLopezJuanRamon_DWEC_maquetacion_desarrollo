import React from "react"
import { useState, useEffect } from "react"

function HomePag() {
  const [isMounted, setIsMounted] = useState(false);
  
  const [clicked, setClicked] = useState(false)
  var [count, setCount] = useState(0)
  
  const [fetchData, setFetchData] = useState({}) 
  const fact = fetchData.fact
  
  const [loading, setLoading] = useState(false)
  
  function handleClick() {
    setLoading(true)
    setClicked(true)
    setCount(++count)
  }
  
  
  useEffect(() => {
    setIsMounted(true)
    if (isMounted) {
      fetch("https://catfact.ninja/fact?")
        .then((response) => response.json())
        .then((data) => setFetchData(data))
        .finally(() => setLoading(false))
    }
  }, [count])

  
  return (
    <main className="main-home">
      <section className="main-home__primer-section-home">
        <button onClick={ handleClick } className="tituloHome">GENERAR CAT FACT</button>
        <img className="imgPrincipal" src="/src/assets/images/imagenPrincipal.png" alt="imagenPrincipal" />
      </section>
      {
        loading && <p>Loading..</p>
      }
      {
        clicked && <p>{ fact }</p>
      }
      <section className="main-home__segundo-section-home">
        <form className="segundo-section-home__form-iniciar-sesion">
          <fieldset className="form-iniciar-sesion__fieldset">
            <h2>Inicio sesión</h2>
            <div>
              <p>
                <label>Gmail:</label>
                <input type="text"></input>
              </p>
              <p>
                <label>Contraseña:</label>
                <input type="text"></input>
              </p>
            </div>
            <a href="/">Iniciar Sesión</a>
          </fieldset>
        </form>

        <form className="segundo-section-home__form-crear-cuenta">
          <fieldset className="form-crear-cuenta__fieldset">
            <h2>Crear cuenta</h2>
            <div>
              <p>
                <label>Gmail:</label>
                <input type="text"></input>
              </p>
              <p>
                <label>Contraseña:</label>
                <input type="text"></input>
              </p>
            </div>
            <a href="/">Crear Cuenta</a>
          </fieldset>
        </form>
      </section>
    </main>
  )
}

export default HomePag