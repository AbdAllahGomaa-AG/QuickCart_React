import { Navigate, useLocation } from 'react-router-dom'

export default function Guards ({ children }) {


  const location = useLocation()
  const token = localStorage.getItem('token')

  if (token && location.pathname === '/login') {
    return <Navigate to='/' replace />
  }

  if (!token && location.pathname !== '/login') {
    return <Navigate to='/login' replace />
  }

  return children
}
