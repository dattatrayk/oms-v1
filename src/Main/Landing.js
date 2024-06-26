import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Range } from 'react-range';
import ItemTile from '../Features/ItemTile';
import Checkout from '../Features/Checkout';
import Login from '../Account/Login';
import SalesList from '../Features/SalesList';
import EditSale from '../Features/EditSale';
import CustomerList from '../Features/CustomerList';

const API_BASE_URL = 'http://localhost:62083/api';
const CLIENT_ID = '9CB0F686-0336-4CDA-9B6E-3162CF5A2D25';
const API_KEY = 'your-api-key'; // Replace with your actual API key

const Landing = ({ activeView }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editOrderIndex, setEditOrderIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/Item`,
          {
            ClientID: CLIENT_ID,
            brandID: selectedBrand,
            categoryID: selectedCategory,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            isInStock: true,
          },
          {
            headers: {
              'ApiKey': API_KEY,
            },
          }
        );
        if (response.data.status === 1) {
          setItems(response.data.data);
        } else {
          console.error('Failed to fetch items:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [selectedCategory, selectedBrand, priceRange]);

  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/Category?clientID=${CLIENT_ID}`, {
            headers: { 'ApiKey': API_KEY },
          }),
          axios.get(`${API_BASE_URL}/Brand?clientID=${CLIENT_ID}`, {
            headers: { 'ApiKey': API_KEY },
          }),
        ]);

        if (categoriesResponse.data.status === 1) {
          setCategories(categoriesResponse.data.data);
        } else {
          console.error('Failed to fetch categories:', categoriesResponse.data.message);
        }

        if (brandsResponse.data.status === 1) {
          setBrands(brandsResponse.data.data);
        } else {
          console.error('Failed to fetch brands:', brandsResponse.data.message);
        }
      } catch (error) {
        console.error('Error fetching categories or brands:', error);
      }
    };

    fetchCategoriesAndBrands();
  }, []);

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
  ];

  const addToCart = (item, newQuantity) => {
    if (newQuantity > 0) {
      const updatedCart = cart.map(cartItem =>
        cartItem.name === item.name ? { ...cartItem, quantity: newQuantity } : cartItem
      );
      if (!updatedCart.some(cartItem => cartItem.name === item.name)) {
        updatedCart.push({ ...item, quantity: newQuantity });
      }
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter(cartItem => cartItem.name !== item.name);
      setCart(updatedCart);
    }
  };

  const openModal = () => {
    if (cart.length > 0) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleCheckout = customer => {
    const newOrder = { customer, items: cart };
    setOrders([...orders, newOrder]);
    setCart([]);
    setIsModalOpen(false);
  };

  const handleEdit = index => {
    setEditOrderIndex(index);
  };

  const handleSaveEdit = editedOrder => {
    const updatedOrders = orders.map((order, index) =>
      index === editOrderIndex ? editedOrder : order
    );
    setOrders(updatedOrders);
    setEditOrderIndex(null);
  };

  const handleCancelEdit = () => {
    setEditOrderIndex(null);
  };

  return (
    <div style={styles.container}>
      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <>
          <main style={styles.main}>
            {activeView === 'main' ? (
              <>
                <div style={styles.filters}>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    style={styles.select}
                  >
                    <option value="0">All Categories</option>
                    {categories.map(category => (
                      <option key={category.categoryName} value={category.categoryID}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedBrand}
                    onChange={e => setSelectedBrand(e.target.value)}
                    style={{ ...styles.select, marginLeft: '10px' }}
                  >
                    <option value="0">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand.brandName} value={brand.brandID}>
                        {brand.brandName}
                      </option>
                    ))}
                  </select>

                  <div style={styles.priceRange}>
                    <label>
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Range
                      step={10}
                      min={0}
                      max={1000}
                      values={priceRange}
                      onChange={values => setPriceRange(values)}
                      renderTrack={({ props, children }) => (
                        <div {...props} style={{ ...props.style, ...styles.track }}>
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div {...props} style={{ ...props.style, ...styles.thumb }} />
                      )}
                    />
                  </div>
                </div>

                <div style={styles.itemsContainer}>
                  {items.map((item, index) => (
                    <ItemTile key={index} item={item} onAddToCart={addToCart} />
                  ))}
                </div>
                <div style={styles.cartContainer}>
                  <div style={styles.cart}>
                    <h3>Cart</h3>
                    {cart.length === 0 ? (
                      <p>Your cart is empty.</p>
                    ) : (
                      <ul>
                        {cart.map((cartItem, index) => (
                          <li key={index}>
                            {cartItem.name} - {cartItem.quantity} x ${cartItem.price} = $
                            {cartItem.quantity * cartItem.price}
                          </li>
                        ))}
                      </ul>
                    )}
                    <button
                      onClick={openModal}
                      style={{
                        ...styles.button,
                        backgroundColor: cart.length > 0 ? '#28a745' : '#6c757d',
                      }}
                      disabled={cart.length === 0}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            ) : activeView === 'sales' ? (
              editOrderIndex !== null ? (
                <EditSale
                  order={orders[editOrderIndex]}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                  items={items}
                  customers={customers}
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: '1',
    padding: '20px',
    textAlign: 'center',
  },
  filters: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    marginLeft: '10px',
  },
  priceRange: {
    marginTop: '10px',
    marginLeft: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  track: {
    height: '6px',
    width: '80%',
    backgroundColor: '#ccc',
  },
  thumb: {
    height: '20px',
    width: '20px',
    backgroundColor: '#999',
  },
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '200px',
    marginTop: '20px',
  },
  cart: {
    textAlign: 'left',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    width: '300px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  button: {
    marginTop: '10px',
    padding: '5px 10px',
    width: '100%',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Landing;
