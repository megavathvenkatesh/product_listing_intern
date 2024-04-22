import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { addToCart } from '../action';

const ProductDetails = ({ cart, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=10&skip=10');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="product-details-container">
        <div className="header">
          <h1>Product Details</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon icon={faCartPlus} className="cart-icon" />
          </div>
          <div className="button-container">
            <button className='login'>Login</button>
            <button className='signup'>SignUp</button>
          </div>
        </div>

      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item">
            <div className="product-image-container">
              <img src={product.thumbnail} alt={product.title} className="product-image" />
              <span className="product-name">{product.title}</span>
              <button onClick={() => addToCart(product)} className="add-to-cart-button">
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
            </div>
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
          </div>
        ))}
      </div>

      <footer className="footer">
        <div>Contact Details</div>
        <div>Venkatesh</div>
        <div>venkateshmegath75@gmail.com</div>
        <div>Cart: {cart.length}</div> 
      </footer>
    </div>
  );
};



const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);



