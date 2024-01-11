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

  return userData[0] // object with the data of the user logged
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

  // checking if the user exist
  const existingUserIndex = allUsersData.findIndex(
    (userObj) => userObj.email === newUserObj.email
  )

  // the user exist
  if (existingUserIndex !== -1) {
    if ( JSON.stringify(newUserObj) !== JSON.stringify(allUsersData[existingUserIndex])) {
      // refresh the userObj because there is at least one change
      allUsersData[existingUserIndex] = newUserObj
      localStorage.setItem("usersData", JSON.stringify(allUsersData))
    }
  } else {
    // the user doesn't exist
    allUsersData.push(newUserObj)
    localStorage.setItem("usersData", JSON.stringify(allUsersData))
  }

}

