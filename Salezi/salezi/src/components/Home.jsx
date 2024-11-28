import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

 
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchResults([]);
    } else {
      setSearchResults(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.category.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  const incrementQuantity = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity++;
      return updatedCart;
    });
  };

  const decrementQuantity = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity--;
      }
      return updatedCart;
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const updatePagination = () => {
      const totalPages = Math.ceil(searchResults.length / 6);
      setTotalPages(totalPages);
    };
    updatePagination();
  }, [searchResults]);

  return (
    <div id="app">
      <header>
        <nav className="navbar">
          <div className="logo-menu-container">
            <Link to="/" className="logo">
              <img src="../../public/images/fnac13.png" alt="MYLOGO" className="MYLOGO" />
            </Link>
            <div className="menu-container">
              <img
                src="/images/menu.png"
                alt="menu"
                className="menu"
                onClick={toggleMenu}
              />
            </div>
          </div>
          <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="menu-header">
              <span className="close-icon" onClick={toggleMenu}>
                ×
              </span>
            </div>
            <ul className="menu-items">
              <li>
                <Link to="/Home" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/DVDs" onClick={toggleMenu}>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/Tech" onClick={toggleMenu}>
                  Magazine
                </Link>
              </li>
            </ul>
          </div>
          <div className="search-bar">
            <img src="../../public/images/fnac15.png" alt="search" className="loop" />
            <input
              type="Rechercher un produit"
              value={searchTerm}
              className="search-input"
              placeholder="Rechercher un produit" 
              onChange={handleSearch}
            />
          </div>
          <ul className="nav-items">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">DVDs</Link>
            </li>
            <li>
              <Link to="/tech">Tech</Link>
            </li>
          </ul>
          <div className="icons">
            <div className="cart-icon" onClick={() => setCartOpen(true)}>
              <p>Mon panier</p>
              {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </div>
            <div className="login-link">
              <Link to="/login">Me connecter</Link>
            </div>
          </div>
        </nav>
      </header>

      {isCartOpen && (
        <div className="cart-modal" onClick={() => setCartOpen(false)}>
          <div className="cart-content" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Mon panier</h2>
              <button className="close-btn" onClick={() => setCartOpen(false)}>
                ×
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Votre panier est vide</p>
              </div>
            ) : (
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p className="cart-item-price">{item.price.toFixed(2)} €</p>
                    </div>
                    <div className="cart-item-quantity">
                      <button onClick={() => decrementQuantity(index)} disabled={item.quantity <= 1}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => incrementQuantity(index)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
                <button className="checkout-btn" onClick={() => console.log('Checkout')}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
