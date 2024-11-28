import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './pages/main';
import Admin from './pages/admin';
import Manager from './pages/manager';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} /> 
                <Route path="/admin" element={<Admin />} />
                <Route path="/manager" element={<Manager />} />
            </Routes>
        </Router>
    );
};

export default App;
