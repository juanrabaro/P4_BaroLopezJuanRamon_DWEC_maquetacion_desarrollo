import React from "react"
import useFetch from "./useFetch"

function Wiki() {

  const { fetchData, loading } = useFetch("https://catfact.ninja/facts?limit=3")
  const data = fetchData.data

  return(
    <main className="main-wiki">
      <h1>WIKI</h1>
      <ul>
        {
          loading && <li>Loading...</li>
        }
        {
          data?.map((factObject) => {
            return <li key={ data.indexOf(factObject) }>{ factObject.fact }</li>
          })
        }
        {/*
          <li>{ data.path }</li>
      */}
      </ul>
    </main>
  )
}

export default Wiki