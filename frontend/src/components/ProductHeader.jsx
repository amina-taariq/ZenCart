import React from "react";
import { TbArrowRight } from "react-icons/tb";

const ProductHeader = (props) => {
  const { product } = props;
    return (
     
       
    <div className="max-padd-container mt-20 flex items-center flex-wrap gap-x-2 medium-16 py-4 capitalize">
      Home <TbArrowRight /> Shop <TbArrowRight /> {product.category} <TbArrowRight /> {product.name}
    </div>
  );

      
   
};

export default ProductHeader;
