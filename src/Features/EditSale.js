import React, { useState, useEffect } from 'react';

const EditSale = ({ order, onSave, onCancel, items, customers }) => {
  const [editedOrder, setEditedOrder] = useState({ ...order });
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  useEffect(() => {
    setEditedOrder({ ...order });
  }, [order]);

  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = editedOrder.saleDetail.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setEditedOrder({ ...editedOrder, saleDetail: newItems });
  };

  const handleAddItem = (item) => {
    setEditedOrder({
      ...editedOrder,
      items: [
        ...editedOrder.saleDetail,
        { ...item, quantity: 1 }
      ]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = editedOrder.saleDetail.filter((item, i) => i !== index);
    setEditedOrder({ ...editedOrder, items: newItems });
  };

  const handleSave = () => {
    if (isNewCustomer) {
      const customer = { ...newCustomer };
      onSave({ ...editedOrder, customer });
    } else {
      onSave(editedOrder);
    }
  };

  // Filter items to exclude existing items in the order
  const availableItems = items.filter(item => 
    !editedOrder.saleDetail.some(orderItem => orderItem.itemName === item.itemName)
  );

  return (
    <div style={editSaleContainerStyle}>
      <h2>Edit Sale</h2>
      <div style={formGroupStyle}>
        <label>Customer:</label>
        <input
          type="text"
          value={editedOrder.customerName}
          readOnly
          style={inputStyle}
        />
      </div>
      <h3>Items</h3>
      {editedOrder.saleDetail.map((item, index) => (
        <div key={index} style={itemGroupStyle}>
          <div style={formGroupStyle}>
            <label>Item Name:</label>
            <input
              type="text"
              value={item.itemName}
              readOnly
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label>Quantity:</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label>Rate:</label>
            <input
              type="number"
              value={item.price}
              readOnly
              style={inputStyle}
            />
          </div>
          <button onClick={() => handleRemoveItem(index)} style={removeButtonStyle}>Remove</button>
        </div>
      ))}
      <div style={formGroupStyle}>
        <label>Add Item:</label>
        <select onChange={(e) => handleAddItem(availableItems.find(item => item.itemName === e.target.value))} style={inputStyle}>
          <option value="">Select an item</option>
          {availableItems.map((item, index) => (
            <option key={index} value={item.itemName}>{item.itemName}</option>
          ))}
        </select>
      </div>
      <button onClick={handleSave} style={saveButtonStyle}>Save</button>
      <button onClick={onCancel} style={cancelButtonStyle}>Cancel</button>
    </div>
  );
};

const editSaleContainerStyle = {
  padding: '20px',
  textAlign: 'center',
};

const formGroupStyle = {
  marginBottom: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
  marginBottom: '10px',
};

const itemGroupStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '10px',
  marginBottom: '10px',
};

const removeButtonStyle = {
  marginTop: '10px',
  padding: '10px 20px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const saveButtonStyle = {
  marginTop: '10px',
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '10px',
};

const cancelButtonStyle = {
  marginTop: '10px',
  padding: '10px 20px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default EditSale;