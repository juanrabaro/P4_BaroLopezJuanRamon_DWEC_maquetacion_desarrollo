import React from "react"

function HomePag() {
  return (
    <main className="main-home">
      <section className="main-home__primer-section-home">
        <a href="/" className="tituloHome">GENERAR CAT FACT</a>
        <img className="imgPrincipal" src="/src/assets/images/imagenPrincipal.png" alt="imagenPrincipal" />
      </section>
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