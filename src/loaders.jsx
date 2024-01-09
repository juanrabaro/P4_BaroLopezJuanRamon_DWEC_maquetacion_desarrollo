// load API data for all the breeds
export const loaderBreeds = async() => {
  const res = await fetch("https://catfact.ninja/breeds?limit=98")
  const breeds = await res.json()
  const newBreedsList = breeds.data.map((item, index) => {
      var newObj = { ...item }
      newObj.id = index
      return newObj
  })

  const modifiedBreeds = newBreedsList

  return { breeds: modifiedBreeds }
}
// load API data for one specific breed(dynamic)
export async function loaderBreed({ params }) {
  const res = await fetch(`https://catfact.ninja/breeds?limit=${params.id}`)
  const data = await res.json()
  const breed = await data.data[params.id-1]
  return { breed }
}


// load API data for all the facts
export const loaderFacts = async() => {
  const res = await fetch("https://catfact.ninja/facts?limit=332")
  const facts = await res.json()

  const newFactsList = facts.data.map((item, index) => {
    var newObj = { ...item }
    delete newObj["length"]
    newObj.id = index
    return newObj
  })

  const modifiedFacts = newFactsList

  return { facts: modifiedFacts }
}
// load API data for one specific fact(dynamic)
export async function loaderFact({ params }) {
  const res = await fetch(`https://catfact.ninja/facts?limit=${params.id}`)
  const data = await res.json()
  const fact = await data.data[params.id-1]
  return { fact }
}