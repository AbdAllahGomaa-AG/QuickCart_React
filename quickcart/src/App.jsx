import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import UserLayout from './components/UserLayout/UserLayout'
import Home from './components/UserLayout/Home/Home'
import Shop from './components/UserLayout/Shop/Shop'
import Login from './components/shared/Login/Login'
import Register from './components/shared/Register/Register'
import UserContextProvider from './context/UserContextProvider'
import ForgetPassword from './components/shared/ForgetPassword/ForgetPassword'
import Guards from './guards/guards'


//#region Routing
let routers = createBrowserRouter([
  {
    path: '',
    element: <UserLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'home', element: <Guards><Home /></Guards> },
      { path: 'shop', element: <Guards><Shop /></Guards> },
      { path: 'login', element: <Guards><Login /></Guards> },
      { path: 'register', element: <Guards><Register /></Guards> },
      { path: 'forgot-password', element: <Guards><ForgetPassword /></Guards> },

      { path: '*', element: <Shop /> }
    ]
  }
])
//#endregion

function App () {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={routers}></RouterProvider>
      </UserContextProvider>
    </>
  )
}

export default App
