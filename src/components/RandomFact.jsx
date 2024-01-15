import React, { useState } from 'react'

const RandomFact = () => {
  
  const [randomFact, setRandomFact] = useState(null)
  const [loading, setLoading] = useState(null)
  

  // generate a random fact
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
      <button className='main-home__random-div__random-button' onClick={ randomFactGenerator }>Generate Random Fact</button>
      {
        loading ?
        <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        : <p className='main-home__random-div__random-fact'>{ randomFact }</p>
      }
    </>
  )
}

export default RandomFact