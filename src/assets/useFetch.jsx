
export async function fetchData(url) {
  console.log("fetch")
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error("HTTP error")
    }
    return res.json()

  } catch(error) {
    console.log("Fetch error", error)
    throw error
  }
}
