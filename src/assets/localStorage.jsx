// REFACTORIZAR MUY IMPORTANTE
export function uploadUser(newUsers) {
  localStorage.setItem("users", JSON.stringify(newUsers))
}

export function bringUsers() {
  return JSON.parse(localStorage.getItem("users")) || []
}



export function uploadFav(newFav) {
  localStorage.setItem("favs", JSON.stringify(newFav))
}

export function bringFavs() {
  return JSON.parse(localStorage.getItem("favs")) || []
}
