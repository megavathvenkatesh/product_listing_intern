import React from 'react';
import { connect } from 'react-redux';

const Header = ({ cart }) => {
  return (
    <header>
      <h1>Header</h1>
      <div>Cart: {cart.length}</div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Header);
