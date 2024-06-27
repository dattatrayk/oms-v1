import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalesList = ({ onEdit }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API}/Sale`, {
          ClientID: '9CB0F686-0336-4CDA-9B6E-3162CF5A2D25',
        },
        {
          headers: {
            'ApiKey': 'your-api-key', // Replace with your actual API key
          },
        });
        if (response.data.status === 1) {
          setOrders(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch sales data');
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
        // Handle error state if needed
      }
    };

    fetchSalesData();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div style={salesListContainerStyle}>
      <h2>Sales List</h2>
      {orders.length === 0 ? (
        <p>No sales have been made yet.</p>
      ) : (
        <ul style={salesListStyle}>
          {orders.map((order, index) => (
            <li key={order.saleID} style={salesItemStyle}>
              <h3>Order {order.saleID}</h3>
              <p><strong>Customer Name:</strong> {order.customerName}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Address:</strong> {order.address}</p>
              {/* <h4>Items:</h4>
              <ul>
                {order.saleDetail.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.name} - {item.quantity} x ${item.rate} = ${item.quantity * item.rate}
                  </li>
                ))}
              </ul> */}
              <button onClick={() => onEdit(order.saleID)} style={editButtonStyle}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Styles remain unchanged
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
