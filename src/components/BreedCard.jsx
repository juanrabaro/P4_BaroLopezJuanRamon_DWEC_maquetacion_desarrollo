/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const BreedCard = ({ item, listFavs, user, deleteFavourite, addFavourite, currentPage }) => {
  return (
    <div className='main-wiki-breeds__section-breeds__container' key={ item.id } id={ item.id }>
      <div className='main-wiki-breeds__section-breeds__container__data-breed'>
        <p>
          Breed - { item.breed }
        </p>
        <p>
          Country - { item.country }
        </p>
        <p>
          Origin - { item.origin }
        </p>
        <p>
          Coat - { item.coat }
        </p>
        <p>
          Pattern - { item.pattern }
        </p>
      </div>
      <div className='container-buttons'>
        {
          (listFavs.some(obj => JSON.stringify(obj) === JSON.stringify(item)) && user) ?
          <button className='delete-button' onClick={ () => deleteFavourite(item) }>Delete from favourites</button>
          :
          <button className='add-button' onClick={ () => addFavourite(item.id) }>Add favourites⭐</button>
        }
        <Link className='view' to={`/breeds/${ item.id+1 }`} state={ currentPage } >View Breed</Link>
      </div>
    </div>
  )
}

export default BreedCard