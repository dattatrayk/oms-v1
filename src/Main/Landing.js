import React, { useState } from 'react';
import ItemTile from '../Features/ItemTile';
import Checkout from '../Features/Checkout';
import Login from '../Account/Login';
import SalesList from '../Features/SalesList';
import EditSale from '../Features/EditSale';
import CustomerList from '../Features/CustomerList'; // Import the new component

const Landing = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('main'); // New state for view management
  const [editOrderIndex, setEditOrderIndex] = useState(null);

  const items = [
    {
      name: 'Item 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description for item 1.',
      rate: 10,
    },
    {
      name: 'Item 2',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description for item 2.',
      rate: 20,
    },
    {
      name: 'Item 3',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description for item 2.',
      rate: 30,
    },
    {
      name: 'Item 4',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description for item 2.',
      rate: 40,
    },
    {
      name: 'Item 5',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description for item 2.',
      rate: 50,
    },
    {
      name: 'Item 6',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description for item 2.',
      rate: 60,
    },
    {
      name: 'Item 7',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description for item 2.',
      rate: 70,
    },
    {
      name: 'Item 8',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description for item 2.',
      rate: 80,
    },
    // Add more items as needed
  ];

  const customers = [
    {
      name: 'Customer 1',
      email: 'customer1@example.com',
      address: '123 Main St',
    },
    {
      name: 'Customer 2',
      email: 'customer2@example.com',
      address: '456 Elm St',
    },
    // Add more customers as needed
  ];

  const addToCart = (item, newQuantity) => {
    if (newQuantity > 0) {
      const existingItem = cart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        setCart(
          cart.map((cartItem) =>
            cartItem.name === item.name ? { ...cartItem, quantity: newQuantity } : cartItem
          )
        );
      } else {
        setCart([...cart, { ...item, quantity: newQuantity }]);
      }
    } else {
      // Remove item from cart if newQuantity is 0
      const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name);
      setCart(updatedCart);
    }
  };

  const openModal = () => {
    if (cart.length > 0) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleCheckout = (customer) => {
    const newOrder = { customer, items: cart };
    setOrders([...orders, newOrder]);
    setCart([]);
    setIsModalOpen(false); // Close modal after checkout
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleEdit = (index) => {
    setEditOrderIndex(index);
  };

  const handleSaveEdit = (editedOrder) => {
    const updatedOrders = orders.map((order, index) => (index === editOrderIndex ? editedOrder : order));
    setOrders(updatedOrders);
    setEditOrderIndex(null);
  };

  const handleCancelEdit = () => {
    setEditOrderIndex(null);
  };

  return (
    <div style={appStyle}>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <nav style={navStyle}>
            <button onClick={() => handleViewChange('main')} style={navButtonStyle}>
              Main
            </button>
            <button onClick={() => handleViewChange('sales')} style={navButtonStyle}>
              Sales List
            </button>
            <button onClick={() => handleViewChange('customers')} style={navButtonStyle}>
              Customer List
            </button>
          </nav>
          <main style={mainStyle}>
            {view === 'main' ? (
              <>
                <div style={itemsContainerStyle}>
                  {items.map((item, index) => (
                    <ItemTile key={index} item={item} onAddToCart={addToCart} />
                  ))}
                </div>
                <div style={cartContainerStyle}>
                  <div style={cartStyle}>
                    <h3>Cart</h3>
                    {cart.length === 0 ? (
                      <p>Your cart is empty.</p>
                    ) : (
                      <>
                        <ul>
                          {cart.map((cartItem, index) => (
                            <li key={index}>
                              {cartItem.name} - {cartItem.quantity} x ${cartItem.rate} = ${cartItem.quantity * cartItem.rate}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <button
                      onClick={openModal}
                      style={{ ...buttonStyle, backgroundColor: cart.length > 0 ? '#28a745' : '#6c757d' }}
                      disabled={cart.length === 0}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            ) : view === 'sales' ? (
              editOrderIndex !== null ? (
                <EditSale
                  order={orders[editOrderIndex]}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                  items={items} // Pass the list of items here
                  customers={customers} // Pass the list of customers here
                />
              ) : (
                <SalesList orders={orders} onEdit={handleEdit} customers={customers} />
              )
            ) : (
              <CustomerList customers={customers} />
            )}
          </main>
          <Checkout isOpen={isModalOpen} onClose={closeModal} cart={cart} onCheckout={handleCheckout} />
        </>
      )}
    </div>
  );
};

const appStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '10px',
  backgroundColor: '#f8f8f8',
  borderBottom: '1px solid #ddd',
};

const navButtonStyle = {
  margin: '0 10px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const mainStyle = {
  flex: '1',
  padding: '20px',
  textAlign: 'center',
};

const itemsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const cartContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: '200px', // Adjust this value as needed
  marginTop: '20px',
};

const cartStyle = {
  textAlign: 'left',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  width: '300px', // Adjust this value as needed
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const buttonStyle = {
  marginTop: '10px',
  padding: '5px 10px',
  width: '100%',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Landing;