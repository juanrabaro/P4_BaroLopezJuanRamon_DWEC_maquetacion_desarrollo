import './App.scss'
import React from 'react'
import { Route, Routes } from "react-router-dom"

import HomePag from './components/HomePag'
import Pag404 from './components/Pag404'

// Con <Link to="/">Home</Link> importado desde "react-router-dom"
// haria que sea SPA(single page application) porque no recargaría la página

function App() {
  return (
    <>
      <header>
        <h1>I am the header</h1>
      </header>
      <main>
        <Routes>
          <Route path='/' element={ <HomePag /> } />
          <Route path='' errorElement={ <Pag404 /> } />
        </Routes>
      </main>
      <footer>
        <h1>I am the footer</h1>
      </footer>
    </>
  )
}

export default App
