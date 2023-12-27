import React from 'react'
import { useLoaderData } from 'react-router-dom'

const Fact = () => {

  const { fact } = useLoaderData()

  return (
    <div>{ fact.fact }</div>
  )
}

export default Fact

export async function loaderFact({ params }) {
  const res = await fetch(`https://catfact.ninja/facts?limit=${params.index}`)
  const data = await res.json()
  const fact = await data.data[params.index-1]
  return { fact }
}