import { useState, useEffect } from "react"

function useFetch(url) {
  const [fetchData, setFetchData] = useState([{}])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setFetchData(data))
      .finally(() => setLoading(false))
      /*.catch((err) => console.log(`error obtaining data from API: ${err}`))*/
  }, [])
  
  console.log(fetchData)
  return { fetchData, loading }
}

export default useFetch