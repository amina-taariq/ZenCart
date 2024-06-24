import React from 'react'
import Hero from '../components/Hero'
import PopularProducts from '../components/PopularProduct'
import Offer from '../components/Offer'
import NewArrivals from '../components/NewArrivals'
import About from '../components/About'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <>
      <Hero />
      <About/>
      <PopularProducts />
      <Offer />
      <NewArrivals />
      <NewsLetter/>
    </>
  )
}

export default Home