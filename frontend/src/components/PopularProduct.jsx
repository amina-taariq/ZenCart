import React, { useState, useEffect } from "react";

//import POPULAR from "../assets/popular"; // Ensure this path is correct based on your project structure
import Item from "./Item";


const PopularProducts = () => {
  const [popular_products, setPopular_products] = useState([]);

   useEffect(() => {
     fetch("http://localhost:5000/popularproducts")
       .then((response) => response.json())
       .then((data) => setPopular_products(data));
   }, []);

  return (
    <section className="max-padd-container bg-primary p-12 xl:py-28">
      {/* title */}
      <div className="text-center max-w-lg mx-auto">
        <h3 className="h3">Popular Products</h3>
        <p>Odit quisquam mollitia nisi. Vel voluptate nisi maxime modi aut voluptatum ad. Qui totam est dolorum qui et eaque</p>
      </div>
      {/* container */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32">
        {popular_products.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            old_price={item.old_price}
            new_price={item.new_price}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
