import React from 'react'
import { Link, useLoaderData, useLocation } from 'react-router-dom'

const Breed = () => {

  const { breed } = useLoaderData()
  const location = useLocation()
  const prevPage = location.state

  return (
    <>
      <Link to="/breeds" state={ prevPage }>Replace</Link>
      <div>{ breed.breed }</div>
      <div>{ breed.country }</div>
      <div>{ breed.origin }</div>
      <div>{ breed.coat }</div>
      <div>{ breed.pattern }</div>
    </>
  )
}

export default Breed