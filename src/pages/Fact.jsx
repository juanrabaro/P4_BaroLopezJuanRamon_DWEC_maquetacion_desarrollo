import React from 'react'
import { useLoaderData } from 'react-router-dom'

const Fact = () => {

  const { fact } = useLoaderData()

  return (
    <div>{ fact.fact }</div>
  )
}

export default Fact