import { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthUserContext = createContext()

export default function AuthProvider ({ children }) {
  const [UserData, setUserData] = useState(null)
  return <AuthContext.Provider value={{UserData, setUserData}}>{children}</AuthContext.Provider>
}
