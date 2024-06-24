import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import ProductHeader from '../components/ProductHeader';
import ProductDisplay from '../components/ProductDisplay';
import ProductDescription from '../components/ProductDescription';
import PopularProducts from '../components/PopularProduct';

const Product = () => {
  const { all_products } = useContext(ShopContext);
  const {productId}= useParams();
  const product = all_products.find((e) => e.id === Number(productId));
  if (!product) {
    return (
      <div>
        product not found!
      </div>
    )
  }
  return (
    <section>
      <div>
        <ProductHeader product={product} />
        <ProductDisplay product={product} />
        <ProductDescription />
        <PopularProducts />
      </div>
    </section>
  );
}

export default Product