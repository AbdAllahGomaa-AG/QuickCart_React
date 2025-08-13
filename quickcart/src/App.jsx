import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import UserLayout from "./components/UserLayout/UserLayout";
import Home from "./components/Home/Home";
let routers = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
