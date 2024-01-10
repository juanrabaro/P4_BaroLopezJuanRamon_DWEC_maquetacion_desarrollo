import React, { useState } from 'react'

const RandomFact = () => {
  
  const [randomFact, setRandomFact] = useState(null)
  const [loading, setLoading] = useState(null)
  

  async function randomFactGenerator() {
    try {
      setLoading(true)
      const res = await fetch("https://catfact.ninja/fact")
      const fact = await res.json()
      setRandomFact(fact.fact)
    } catch ( error ) {
      console.error("Error fetching random fact:", error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <button onClick={ randomFactGenerator }>Random Fact</button>
      {
        loading ? 
        <p>Loading...</p>
        : <p>{ randomFact }</p>

      }
    </>
  )
}

export default RandomFact