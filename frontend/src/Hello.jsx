import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 250px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 5px 0;
`;

const Rating = styled.p`
  color: #f0c040;
`;

const Price = styled.p`
  font-weight: bold;
  color: #b12704;
`;

const MRP = styled.p`
  text-decoration: line-through;
`;

const Discount = styled.p`
  color: green;
`;

const DeliveryInfo = styled.p`
  font-size: 12px;
`;

const AddToCartButton = styled.button`
  background-color: #ff9900;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const ProductCard = ({ product }) => {
  return (
    <CardContainer>
      <Image src={product.image} alt={product.title} />
      <Title>{product.title}</Title>
      <Rating>{product.rating} ⭐ ({product.reviewCount} reviews)</Rating>
      <Price>₹{product.price}</Price>
      <MRP>M.R.P.: ₹{product.mrp}</MRP>
      <Discount>{product.discount}</Discount>
      <DeliveryInfo>{product.delivery}</DeliveryInfo>
      <AddToCartButton>Add to cart</AddToCartButton>
    </CardContainer>
  );
};

export default ProductCard;