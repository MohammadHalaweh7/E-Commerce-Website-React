import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext(null);

export function CartContextProvider({children}) {
  async function addToCartContext(productId) {
    try {
      const token = localStorage.getItem(`userToken`);
      const objData = {
        productId,
      };

      const { data } = await axios.post(
        `https://king-prawn-app-3mgea.ondigitalocean.app/cart/add`,
        objData,
        { headers: { authorization: `Tariq__${token}` } }
      );
      return data;
    } catch (error) {
      console.log(error)
    }
  }
  return <CartContext.Provider value={addToCartContext}>{children}</CartContext.Provider>;
}
