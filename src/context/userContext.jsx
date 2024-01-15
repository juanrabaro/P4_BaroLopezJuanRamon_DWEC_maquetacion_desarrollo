import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(false)
  


  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userLogged")))
  }, [])

  
  if (user && !JSON.parse(localStorage.getItem("userLogged"))) {
    setUser(false)
  }
  



  return (
    <UserContext.Provider value={{ user, setUser }}>
      { children }
    </UserContext.Provider>
  )
}

export default UserProvider
