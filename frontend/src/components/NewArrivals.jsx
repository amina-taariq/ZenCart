import React, { useEffect, useState } from 'react'

import Item from './Item';

const NewArrivals = () => {
  const [newArrival, setNewArrival] = useState([]);
    useEffect(() => {
      fetch("http://localhost:5000/newcollections")
        .then((response) => response.json())
        .then((data) => setNewArrival(data));
    }, []);
  return (
    <section className="max-padd-container bg-primary p-12 xl:py-28">
      <div className="text-center max-w-lg mx-auto">
        <h3 className="h3">New Arrivals </h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Velit cupiditate deserunt magni ut, explicabo dolores alias ea animi ipsam labore.</p>
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32'>
        {newArrival.map((item) => (
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
}

export default NewArrivals