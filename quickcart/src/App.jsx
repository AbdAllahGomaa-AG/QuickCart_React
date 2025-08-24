import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import UserLayout from "./components/UserLayout/UserLayout";
import Home from "./components/UserLayout/Home/Home";
import Shop from "./components/UserLayout/Shop/Shop";
import Login from "./components/shared/Login/Login";
import Register from "./components/shared/Register/Register";
import UserContextProvider from "./context/UserContextProvider";
import ForgetPassword from "./components/shared/ForgetPassword/ForgetPassword";
import Guards from "./guards/guards";
import AllProduct from "./components/Product/AllProduct";
import SpecificProduct from "./components/Product/specificProduct";
import Cart from "./components/Cart/Cart";
import OrderCheckout from "./components/Ordercheckout/Ordercheckout";
import AllOrders from "./components/allorders/allorders";
import CartContextProvider from "./context/CartContextProvider.jsx";
import { Toaster } from "react-hot-toast";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import AllCategories from "./components/categories/AllCategories.jsx";
import Brands from "./components/Brands/Brands.jsx";
import { HelmetProvider } from "react-helmet-async";

//#region Routing
let routers = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "all-product",
        element: <AllProduct />,
      },
      {
        path: "specific-product/:id",
        element: <SpecificProduct />,
      },
      {
        path: "cart",
        element: (
          <Guards>
            <Cart />
          </Guards>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <Guards>
            <OrderCheckout />
          </Guards>
        ),
      },
      {
        path: "allorders",
        element: (
          <Guards>
            <AllOrders />
          </Guards>
        ),
      },
      {
        path: "wishlist",
        element: (
          <Guards>
            <Wishlist />
          </Guards>
        ),
      },
      {
        path: "categories",
        element: <AllCategories />,
      },
      {
        path: "brands",
        element: <Brands />,
      },

      { path: "*", element: <Shop /> },
    ],
  },
]);
//#endregion

function App() {
  return (
    <HelmetProvider>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster position="top-right" reverseOrder={false}></Toaster>
        </UserContextProvider>
      </CartContextProvider>
    </HelmetProvider>
  );
}


export default App;
