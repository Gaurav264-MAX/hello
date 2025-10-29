import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="btn">BUY NOW</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .btn {
    width: 180px;
    height: 50px;
    margin-top: 10px;
    font-size: 1rem;
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 700;
    transition: 0.3s;
    background-color: rgb(14, 14, 26);
    color: rgb(234, 234, 234);
  }

  .btn:hover {
    background: linear-gradient(270deg, rgba(2, 29, 78, 0.7) 0%, rgba(31, 215, 232, 0.8) 60%);
    color: rgb(4, 4, 38);
  }
`;

export default Button;
