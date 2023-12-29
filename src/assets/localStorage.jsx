// REFACTORIZAR MUY IMPORTANTE
export function uploadUser(newUsers) {
  localStorage.setItem("users", JSON.stringify(newUsers))
}

export function bringUsers() {
  return JSON.parse(localStorage.getItem("users")) || []
}



export function uploadFav(newFav, factOrBreed) {
  localStorage.setItem(factOrBreed, JSON.stringify(newFav))
}

export function bringFavs(factOrBreed) {
  return JSON.parse(localStorage.getItem(factOrBreed)) || []
}
