import React, { useState } from 'react';

const Checkout = ({ isOpen, onClose, cart, onCheckout }) => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onCheckout(customer);
    setCustomer({
      name: '',
      email: '',
      address: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.rate * item.quantity, 0);
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <span style={closeButtonStyle} onClick={onClose}>&times;</span>
        <h2>Checkout Details</h2>
        <ul>
          {cart.map((cartItem, index) => (
            <li key={index}>
              {cartItem.name} - {cartItem.quantity} x ${cartItem.rate} = ${cartItem.quantity * cartItem.rate}
            </li>
          ))}
        </ul>
        <h3>Total: ${calculateTotal()}</h3>
        <h3>Customer Details</h3>
        <form>
          <div style={formGroupStyle}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label>Address:</label>
            <textarea
              name="address"
              value={customer.address}
              onChange={handleChange}
              style={textareaStyle}
            />
          </div>
        </form>
        <button onClick={handleSubmit} style={buttonStyle}>Checkout</button>
      </div>
    </div>
  );
};

const modalStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  width: '300px',
  textAlign: 'center',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
};

const formGroupStyle = {
  marginBottom: '10px',
  textAlign: 'left',
};

const inputStyle = {
  width: '100%',
  padding: '5px',
  boxSizing: 'border-box',
};

const textareaStyle = {
  width: '100%',
  padding: '5px',
  boxSizing: 'border-box',
  height: '60px',
};

const buttonStyle = {
  marginTop: '10px',
  padding: '5px 10px',
};

export default Checkout;