import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../environment/environment";


export default async function WishlistAddServices(productId) {
    await toast.promise(
      axios.post(
        `${BASE_URL}/wishlist`,
        { productId: productId },
        { headers: { token: localStorage.getItem("token") } }
      ),
      {
        loading: "Adding to wishlist...",
        success: (res) => {
          console.log(res.data.message);
          const data = res.data;
          if (data.message) {
            return res.data.message;
          }
          throw new Error("Adding to wishlist failed");
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
