import React from "react"
import { useState, useEffect } from "react"
import useFetch from "./useFetch"

function HomePag() {
  
  const [clicked, setClicked] = useState(false)
  
  const [fetchData, setFetchData] = useState({}) 
  const fact = fetchData.fact
  
  
  function handleClick() {
    setClicked(false)
    setClicked(true)
  }

  useEffect(() => {
    console.log("hello");
  }, [clicked])
  
  return (
    <main className="main-home">
      <section className="main-home__primer-section-home">
        <button onClick={ handleClick } className="tituloHome">GENERAR CAT FACT</button>
        <img className="imgPrincipal" src="/src/assets/images/imagenPrincipal.png" alt="imagenPrincipal" />
      </section>
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