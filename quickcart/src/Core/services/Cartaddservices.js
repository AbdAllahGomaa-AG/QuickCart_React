import axios from "axios";
import { BASE_URL } from "../../environment/environment";
import toast from "react-hot-toast";

export default async function CartAddServices(productId, setCart) {
  await toast.promise(
    axios.post(
      `${BASE_URL}/cart`,
      { productId: productId },
      { headers: { token: localStorage.getItem("token") } }
    ),
    
    {
      loading: "Adding to cart...",
      success: (res) => {
        console.log(res.data.message);
        setCart(res.data.data);
        const data = res.data;
        if (data.message) {
          return res.data.message;
        }
        throw new Error("Adding to cart failed");
      },
      error: (err) => {
        if (err.response?.data?.message) {
          return err.response.data.message;
        }
        return "❌ Something went wrong";
      },
    }
  );
}

