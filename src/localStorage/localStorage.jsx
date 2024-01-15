
// bring all the information about all users
export function allUsersData() {
  const allUsers = JSON.parse(localStorage.getItem("usersData")) || []
  return allUsers
}




// see all the data from all user and compare it with the logged user
// to bring the information of the user that is currently logged
export function loadUserLoggedData() {
  // bring the email of the user currently logged
  const userLoggedEmail = localStorage.getItem("userLoggedEmail") || ""
  
  // bring all the information about all users
  const allUsers = allUsersData()

  const userData = allUsers.filter((userObj) => {
    return userObj.email === userLoggedEmail
  })
  
  if ( userData.length ) {
    return userData[0] // object with the data of the user logged
  }
  return { favs: { facts: [], breeds: [] } }
}




// upload the new user data to localStorage and controls
// if localStorage is empty and if user exist
export function uploadNewUsersData(newUserObj) {
  // bring all the information about all users
  const allUsers = allUsersData()

  if ( !allUsers.length ) {
    // just upload the new data user because localStorage is empty
    allUsers.push(newUserObj)
    localStorage.setItem("usersData", JSON.stringify(allUsers))
    return
  }

  // checking if the user exist
  const existingUserIndex = allUsers.findIndex(
    (userObj) => userObj.email === newUserObj.email
  )

  // the user exist
  if (existingUserIndex !== -1) {
    if ( JSON.stringify(newUserObj) !== JSON.stringify(allUsers[existingUserIndex])) {
      // refresh the userObj because there is a change
      allUsers[existingUserIndex] = newUserObj
      localStorage.setItem("usersData", JSON.stringify(allUsers))
    }
  } else {
    // the user doesn't exist just upload the new user data
    allUsers.push(newUserObj)
    localStorage.setItem("usersData", JSON.stringify(allUsers))
  }
}

