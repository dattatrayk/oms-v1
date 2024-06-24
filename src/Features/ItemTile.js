import React, { useState } from 'react';

const ItemTile = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    onAddToCart(item, quantity + 1); // Call parent function with updated quantity
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onAddToCart(item, quantity - 1); // Call parent function with updated quantity
    }
  };

  return (
    <div style={itemTileStyle}>
      <h3>{item.name}</h3>
      <img src={item.image} alt={item.name} style={imageStyle} />
      <p>{item.description}</p>
      <p>Rate: ${item.rate}</p>
      <div>
        <button onClick={handleDecrement} style={buttonStyle}>-</button>
        <span style={quantityStyle}>{quantity}</span>
        <button onClick={handleIncrement} style={buttonStyle}>+</button>
      </div>
    </div>
  );
};

const itemTileStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '10px',
  margin: '10px',
  width: '200px',
  textAlign: 'center',
};

const imageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  marginBottom: '10px',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  padding: '5px 10px',
  margin: '5px',
};

const quantityStyle = {
  display: 'inline-block',
  padding: '0 10px',
  fontSize: '16px',
  fontWeight: 'bold',
};

export default ItemTile;