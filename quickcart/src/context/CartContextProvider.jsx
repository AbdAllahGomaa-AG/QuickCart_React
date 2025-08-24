import { useEffect, useState } from "react";
import { CartContext } from "./CartContextProvider";
import axios from "axios";
import { BASE_URL } from "../environment/environment";

export default function CartContextProvider({ children }) {
  const [Cart, setCart] = useState([]);

  useEffect(() => {
    GetProducts();
  }, [Cart]);

  //#region methods
  async function GetProducts() {
    try {
      let { data } = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCart(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  //#endregion

  return (
    <CartContext.Provider
      value={{ Cart, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
