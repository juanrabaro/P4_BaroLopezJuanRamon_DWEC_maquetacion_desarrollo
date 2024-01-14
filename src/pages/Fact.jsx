import React from 'react'
import { useLoaderData, Link, useLocation } from 'react-router-dom'

const Fact = () => {

  const { fact } = useLoaderData()
  const location = useLocation()
  const prevPage = location.state
  
  return (
    <main className='main-fact'>
      <section className='main-fact__container'>
        <div className='main-fact__container__button-container'>
          <Link className='main-fact__container__button-container__button-back' to="/facts" state={ prevPage }>⬅ Wiki Facts</Link>
        </div>
        <p className='main-fact__container__fact'>{ fact.fact }</p>
      </section>
    </main>
  )
}

export default Fact