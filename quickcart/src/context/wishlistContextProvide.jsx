import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../environment/environment";

export default function WishlistContextProvider({ children }) {
  const [Wishlist, setWishlist] = useState([]);

  useEffect(() => {
    GetWishlist();
  }, [Wishlist]);

  //#region methods
  async function GetWishlist() {
    try {
      let { data } = await axios.get(`${BASE_URL}/wishlist`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setWishlist(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  //#endregion

  return (
    <WishlistContextProvider value={{ Wishlist, setWishlist }}>
      {children}
    </WishlistContextProvider>
  );
}
