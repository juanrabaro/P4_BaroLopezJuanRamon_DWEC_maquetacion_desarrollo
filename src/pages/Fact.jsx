import React from 'react'
import { useLoaderData, Link, useLocation } from 'react-router-dom'

const Fact = () => {

  const { fact } = useLoaderData()
  const location = useLocation()
  const prevPage = location.state
  
  return (
    <>
      <Link to="/facts" state={ prevPage }>Replace</Link>
      <div>{ fact.fact }</div>
    </>
  )
}

export default Fact