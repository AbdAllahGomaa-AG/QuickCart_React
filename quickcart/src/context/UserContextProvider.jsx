import { useState } from 'react'
import { UserData } from './UserContext'

export default function UserContextProvider ({ children }) {
  const [Token, setToken] = useState(null)

  return (
    <UserData.Provider value={{ Token, setToken }}>
      {children}
    </UserData.Provider>
  )
}
