import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

const UserProvider = ({ children }) => {

  
  
  const [user, setUser] = useState(false)
  
  useEffect(() => {
    const userLogged = localStorage.getItem("userLogged")
    
    setUser(JSON.parse(userLogged))
  }, [])
  
  
  

  return (
    <UserContext.Provider value={ {user, setUser} }>
      { children }
    </UserContext.Provider>
  )
}

export default UserProvider
