import React from 'react';

const CustomerList = ({ customers }) => {
  return (
    <div>
      <h2>Customer List</h2>
      {customers.length === 0 ? (
        <p>No customers yet.</p>
      ) : (
        <ul>
          {customers.map((customer, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Address:</strong> {customer.addressDetails.address}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;