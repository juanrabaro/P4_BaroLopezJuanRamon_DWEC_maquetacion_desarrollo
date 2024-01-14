import React from 'react'
import { Link, useLoaderData, useLocation } from 'react-router-dom'

const Breed = () => {

  const { breed } = useLoaderData()
  const location = useLocation()
  const prevPage = location.state

  return (
    <main className='main-breed'>
      <section className='main-breed__container'>
        <div className='main-breed__container__button-container'>
          <Link className='main-breed__container__button-container__button-back' to="/breeds" state={ prevPage }>⬅ Wiki Breeds</Link>
        </div>
        <div className='main-breed__container__breeds-container'>
          <p className='main-breed__container__breeds-container__breed'><strong>Breed</strong> - { breed.breed }</p>
          <p className='main-breed__container__breeds-container__breed'><strong>Country</strong> - { breed.country }</p>
          <p className='main-breed__container__breeds-container__breed'><strong>Origin</strong> - { breed.origin }</p>
          <p className='main-breed__container__breeds-container__breed'><strong>Coat</strong> - { breed.coat }</p>
          <p className='main-breed__container__breeds-container__breed'><strong>Pattern</strong> - { breed.pattern }</p>
        </div>
      </section>
    </main>
  )
}

export default Breed