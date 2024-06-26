import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Checkout = ({ isOpen, onClose, cart, onCheckout }) => {
  const [customer, setCustomer] = useState({
    id: 0,
    name: '',
    email: '',
    address: '',
    contactNo: '',
  });
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && value.trim() === "") {
      // If the name input is cleared, reset customer id to 0
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        id: 0,
        [name]: value,
      }));
    } else {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        [name]: value,
      }));
      // Fetch autocomplete options based on current input value
      fetchAutocompleteOptions(value);
    }
  };

  const fetchAutocompleteOptions = async (searchText) => {
    try {
      const response = await axios.post(
        'http://localhost:62083/api/Customer',
        {
          ClientID: '9CB0F686-0336-4CDA-9B6E-3162CF5A2D25',
          SearchText: searchText,
        },
        {
          headers: {
            'ApiKey': 'your-api-key', // Replace with your actual API key
          },
        }
      );

      if (response.data.status === 1) {
        setAutocompleteOptions(response.data.data);
      } else {
        console.error('Failed to fetch autocomplete options:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching autocomplete options:', error);
    }
  };

  const handleAutocompleteSelect = async (customerId, customerName) => {
    try {
      const response = await axios.get(
        `http://localhost:62083/api/Customer/GetByID?customerID=${customerId}`,
        {
          headers: {
            'ApiKey': 'your-api-key', // Replace with your actual API key
          },
        }
      );
      if (response.data.status === 1) {
        const selectedCustomer = response.data.data;
        setCustomer({
          id: selectedCustomer.customerID,
          name: selectedCustomer.name,
          email: selectedCustomer.email,
          address: selectedCustomer.addressDetails.address,
          contactNo: selectedCustomer.contactNo,
        });
        setAutocompleteOptions([]); // Clear autocomplete options
      } else {
        console.error('Failed to fetch customer details:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare sale details
      const saleDetails = cart.map((cartItem) => ({
        ItemID: cartItem.itemID, // Replace with actual item ID from your data
        Price: cartItem.price,
        Quantity: cartItem.quantity,
        ItemName: cartItem.name,
      }));

      // Prepare payload for API request
      const payload = {
        ClientID: '9CB0F686-0336-4CDA-9B6E-3162CF5A2D25',
        SaleDate: new Date().toISOString(), // Example: current date and time
        CustomerID: customer.id, // Pass selected customer ID
        CustomerName: customer.name,
        ContactNo: customer.contactNo, // Adding contact number
        Email: customer.email,
        Address: customer.address,
        TotalAmount: calculateTotal(),
        Quantity: cart.length,
        SaleDetail: saleDetails,
      };

      // Call API to create sale
      const response = await axios.post(
        'http://localhost:62083/api/Sale/Create',
        payload,
        {
          headers: {
            'ApiKey': 'your-api-key', // Replace with your actual API key
          },
        }
      );

      // Check the response status
      if (response.data.status === 1) {
        toast.success('Order placed successfully');
        onCheckout(customer);
        setCustomer({
          id: 0,
          name: '',
          email: '',
          address: '',
          contactNo: '', // Reset contact number field
        });
        onClose();
      } else {
        toast.error('Failed to place order');
      }
    } catch (error) {
      // Handle error scenarios
    console.error('Error creating sale:', error);
    toast.error('Failed to place order');
    // Optionally handle error feedback to the user
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <span style={closeButtonStyle} onClick={onClose}>&times;</span>
        <h2>Checkout Details</h2>
        <ul>
          {cart.map((cartItem, index) => (
            <li key={index}>
              {cartItem.name} - {cartItem.quantity} x ${cartItem.price} = ${cartItem.quantity * cartItem.price}
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
              autoComplete="off"
            />
            {autocompleteOptions.length > 0 && (
              <ul style={autocompleteListStyle}>
                {autocompleteOptions.map((option) => (
                  <li
                    key={option.customerID}
                    onClick={() => handleAutocompleteSelect(option.customerID, option.name)}
                    style={autocompleteListItemStyle}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            )}
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
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNo"
              value={customer.contactNo}
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
        {showSuccessMessage && (
          <p style={{ color: 'green', marginTop: '10px' }}>Order successfully placed!</p>
        )}
        {errorMessage && (
          <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
        )}
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

const autocompleteListStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  position: 'absolute',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  zIndex: 1,
  width: 'calc(100% - 10px)',
};

const autocompleteListItemStyle = {
  padding: '5px',
  cursor: 'pointer',
};

export default Checkout;
