
import React, { useContext } from "react";
import Item from "../components/Item";
import { ShopContext } from "../context/ShopContext.jsx";

const Category = ({ category, banner }) => {
const { all_products} = useContext(ShopContext);

// //const [allProduct, setAllProduct] = useState([])
// useEffect(() => {
// setAllProduct(all_products);
// }, []);

return (
<section className="max-padd-container bg-primary">
<div className="pt-6">
<img
       src={banner}
       alt=""
       className="block mb-7 mx-auto"
     />
</div>
<div className="flexBetween my-10 mx-2">
<h5>
<span>Showing 1-12 </span> out of 36 products
</h5>
</div>
<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32">
{all_products.map((item) => {
if (category === item.category) {
return (
<Item
         key={item.id}
         id={item.id}
         name={item.name}
         image={item.image}
         old_price={item.old_price}
         new_price={item.new_price}
       />
);}} )}
</div>
</section>
);
}

export default Category