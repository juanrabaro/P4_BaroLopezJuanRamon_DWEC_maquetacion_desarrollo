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




// NEW LOCALSTORAGE
export function bringUserLoggedData() {
  // bring the email of the user currently logged
  const userLoggedEmail = JSON.parse(localStorage.getItem("userLoggedEmail")) || ""

  // bring all the information about all users
  // maybe this should be a separated function
  const allUsersData = JSON.parse(localStorage.getItem("usersData")) || []
  
  const userData = allUsersData.filter((userObj) => {
    return userObj.email = userLoggedEmail
  })

  return userData
}

