import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Products from '../components/Products';
import data from '../db/data';

const ParentComponent = () => {
  console.log('data:', data); // check if data is imported correctly

  const [products, setProducts] = useState(data); // set initial state with data from file
  console.log('initial products state:', products); // check if state is initialized correctly

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [count, setCount] = useState(0);

  const handleFilter = (categories) => {
    console.log('handleFilter called with categories:', categories); // check if handleFilter is called correctly
    const filteredProducts = products.filter((product) => product.categories === categories);
    setFilteredProducts(filteredProducts);
    setCount(filteredProducts.length);
  };

  return (
    <div>
      <Sidebar handleFilter={handleFilter} />
      <Products result={filteredProducts} count={count} />
    </div>
  );
};

export default ParentComponent;