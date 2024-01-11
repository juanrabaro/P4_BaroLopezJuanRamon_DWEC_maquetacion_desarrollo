import { createContext, useEffect, useState } from "react"
import { loadUserLoggedData, uploadNewUsersData } from "../localStorage/localStorage"

export const UserContext = createContext()

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(false)
  const [userLoggedData, setUserLoggedData] = useState({
    email: "",
    pwd: "",
    username: "",
    age: 0,
    conditions: true
  })
  
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userLogged")))
    //setUserLoggedData(loadUserLoggedData())
  }, [])

  /*
  useEffect(() => {
    const dummyUser = {
      email: "dummy@gmail.com",
      pwd: "nosenose",
      username: "dummy",
      age: 20,
      conditions: true
    }
    setUserLoggedData(uploadNewUsersData(dummyUser))
  }, [userLoggedData])*/
  

  
  if (user && !JSON.parse(localStorage.getItem("userLogged"))) {
    setUser(false)
  }
  

  return (
    <UserContext.Provider value={ {user, setUser, userLoggedData, setUserLoggedData} }>
      { children }
    </UserContext.Provider>
  )
}

export default UserProvider
