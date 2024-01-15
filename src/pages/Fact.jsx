import React from 'react'
import { useLoaderData, Link, useLocation } from 'react-router-dom'

const Fact = () => {

  const { fact } = useLoaderData()
  const location = useLocation()
  const prevPage = location.state.currentPage
  const prevFilter = location.state.filter


  return (
    <main className='main-fact'>
      <section className='main-fact__container'>
        <div className='main-fact__container__button-container'>
          <Link className='main-fact__container__button-container__button-back' to="/facts" state={{ prevPage: prevPage, prevFilter: prevFilter }}>⬅ Wiki Facts</Link>
        </div>
        <p className='main-fact__container__fact'>{ fact.fact }</p>
      </section>
    </main>
  )
}

export default Fact