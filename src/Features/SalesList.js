import React from 'react';

const SalesList = ({ orders, onEdit }) => {
  return (
    <div style={salesListContainerStyle}>
      <h2>Sales List</h2>
      {orders.length === 0 ? (
        <p>No sales have been made yet.</p>
      ) : (
        <ul style={salesListStyle}>
          {orders.map((order, index) => (
            <li key={index} style={salesItemStyle}>
              <h3>Order {index + 1}</h3>
              <p><strong>Customer Name:</strong> {order.customer.name}</p>
              <p><strong>Email:</strong> {order.customer.email}</p>
              <p><strong>Address:</strong> {order.customer.address}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.name} - {item.quantity} x ${item.rate} = ${item.quantity * item.rate}
                  </li>
                ))}
              </ul>
              <button onClick={() => onEdit(index)} style={editButtonStyle}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const salesListContainerStyle = {
  padding: '20px',
  textAlign: 'center',
};

const salesListStyle = {
  listStyleType: 'none',
  padding: '0',
};

const salesItemStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '10px',
  textAlign: 'left',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const editButtonStyle = {
  marginTop: '10px',
  padding: '5px 10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
export default SalesList;