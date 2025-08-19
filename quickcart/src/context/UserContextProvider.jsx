import { useState } from 'react'
import { UserData } from './UserContext'

export default function UserContextProvider ({ children }) {
  const [Token, setToken] = useState(null)
  const [AllCart, setAllCart] = useState([])

  return (
    <UserData.Provider value={{ Token, setToken, AllCart, setAllCart }}>
      {children}
    </UserData.Provider>
  )
}
