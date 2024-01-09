import React from 'react'
import { useLoaderData } from 'react-router-dom'

const Breed = () => {

  const { breed } = useLoaderData()

  return (
    <>
      <div>{ breed.breed }</div>
      <div>{ breed.country }</div>
      <div>{ breed.origin }</div>
      <div>{ breed.coat }</div>
      <div>{ breed.pattern }</div>
    </>
  )
}

export default Breed