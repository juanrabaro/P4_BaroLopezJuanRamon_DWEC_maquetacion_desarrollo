/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const FactCard = ({ item, listFavs, user, currentPage, deleteFavourite, addFavourite, filter }) => {
  return (
    <div className='container' key={ item.id }>
      <p id={ item.id }>
        { item.fact }
      </p>
      <div className='container-buttons'>
        {
          (listFavs.some(obj => JSON.stringify(obj) === JSON.stringify(item)) && user) ?
          <button className='delete-button' onClick={ () => deleteFavourite(item) }>Delete from favourites</button> 
          :
          <button className='add-button' onClick={ () => addFavourite(item.id) }>Add favourites⭐</button>
        }
        <Link className='view' to={`/facts/${ item.id+1 }`} state={{ currentPage: currentPage, filter: filter }} >View Fact</Link>
      </div>
    </div>
  )
}

export default FactCard