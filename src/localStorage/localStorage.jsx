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
export function loadUserLoggedData() {
  // bring the email of the user currently logged
  const userLoggedEmail = localStorage.getItem("userLoggedEmail") || ""

  // bring all the information about all users
  // maybe this should be a separated function
  const allUsersData = JSON.parse(localStorage.getItem("usersData")) || []

  const userData = allUsersData.filter((userObj) => {
    return userObj.email === userLoggedEmail
  })

  return userData
}

export function uploadNewUsersData(newUserObj) {
  // bring all the information about all users
  // maybe this should be a separated function
  const allUsersData = JSON.parse(localStorage.getItem("usersData")) || []

  if ( !allUsersData.length ) {
    // just upload the new data user because localStorage is empty
    allUsersData.push(newUserObj)
    localStorage.setItem("usersData", JSON.stringify(allUsersData))
    return
  }
  // localStorage is not empty
  // list of all users and the newUserData was sustituted
  allUsersData.forEach((userObj) => {
    if ( newUserObj.email === userObj.email) {
      if ( JSON.stringify(newUserObj) !== JSON.stringify(userObj) ) {
        userObj = newUserObj
        return
      }
      return
    }
    allUsersData.push(newUserObj)
    localStorage.setItem("usersData", JSON.stringify(allUsersData))
  })
  //localStorage.setItem("usersData", JSON.stringify(newAllUsersData))
}

