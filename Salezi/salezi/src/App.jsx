import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import Products from './components/Products';

const App = () => {
    return (
        <Router>
            <Home></Home>
            <Routes>
            <Route path="/" element={<Products />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/products" element={<Products />} /> 
            </Routes>
        </Router>
    );
};

export default App;

