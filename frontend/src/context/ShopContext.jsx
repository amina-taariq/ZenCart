import { createContext, useEffect, useState } from "react";
import CartItems from "../components/CartItems";


export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++){
    cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {
  const [all_products, setAllProduct] = useState([])
  const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
      fetch("http://localhost:5000/allproducts")
        .then((response) => response.json())
        .then((data) => setAllProduct(data));
      if (localStorage.getItem("auth-token")) {
        fetch("http://localhost:5000/getcart", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: "",
        })
          .then((response) => response.json())
          .then((data) => setCartItems(data));
      }
    }, []);

const addToCart = (itemId) => {
  setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

  if (localStorage.getItem("auth-token")) {
    fetch("http://localhost:5000/addtocart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("There was a problem with the fetch operation:", error));
  }
};

   const removeFromCart = (itemId) => {
     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (localStorage.getItem("auth-token")) {
          fetch("http://localhost:5000/removefromcart", {
            method: "POST",
            headers: {
              Accept: "application/form-data",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId: itemId }),
          })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
  };
    const clearCart = async () => {
       if (localStorage.getItem("auth-token")) {
         fetch("http://localhost:5000/clearcart", {
           method: "POST",
           headers: {
             Accept: "application/form-data",
             "auth-token": `${localStorage.getItem("auth-token")}`,
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ }),
         })
           .then((response) => response.json())
           .then((data) => console.log(data));
      }
      setCartItems({})
    };
    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = all_products.find((product) => product.id === Number(item)); 
          totalAmount += itemInfo.new_price * cartItems[item]; 
        }
      }
      return totalAmount;
    };

    const getTotalCartItems = () => {
      let totalItem = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          totalItem += cartItems[item]; 
        }
      }
      return totalItem;
  };
  const increaseQuantity = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) => {
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      } else {
        const newCartItems = { ...prev };
        delete newCartItems[id];
        return newCartItems;
      }
    });
  };

  const contextValue = { all_products, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems, increaseQuantity, decreaseQuantity, clearCart };
  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
