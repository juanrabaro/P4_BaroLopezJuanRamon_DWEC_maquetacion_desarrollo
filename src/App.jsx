import './App.scss'
import React from 'react'
import { Route, Routes } from "react-router-dom"

import HomePag from './components/HomePag'
import Pag404 from './components/Pag404'

// Con <Link to="/">Home</Link> importado desde "react-router-dom"
// haria que sea SPA(single page application) porque no recargaría la página
// /:name
// useParams
// <Outlet />

function App() {
  return (
    <>
      <header>
        <img src='/src/assets/images/logo.png' alt="logo" />
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/contacto">Contacto</a></li>
          <li><a href="/wiki">Wiki</a></li>
          <li><a href="/iniciarSesion">Iniciar sesión</a></li>
          <li><a href="/crearCuenta">Crear cuenta</a></li>
        </ul>
      </header>
      <Routes>
        <Route path='/' element={ <HomePag /> } />
        <Route path='/contacto' element={ <Pag404 /> } />
      </Routes>
      <footer>
        <h1>I am the footer</h1>
      </footer>
    </>
  )
}

export default App
