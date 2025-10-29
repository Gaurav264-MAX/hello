import React from 'react';
import ProductCard from './Hello.jsx';

const products = [
  {
    image: 'path/to/image1.jpg',
    title: 'Monitor AC Stand/Heavy Duty Air Conditioner',
    rating: '4.4',
    reviewCount: '8.8K',
    price: '799',
    mrp: '1,990',
    discount: '(58% off)',
    delivery: 'FREE delivery Thu, 3 Apr',
  },
  {
    image: 'path/to/image2.jpg',
    title: 'SIROTIA 24" AC Stand Heavy Duty',
    rating: '4.0',
    reviewCount: '3',
    price: '691',
    mrp: '2,990',
    discount: '(77% off)',
    delivery: 'FREE delivery Sun, 30 Mar',
  },
  // Add more products as needed
];

const ProductList = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;