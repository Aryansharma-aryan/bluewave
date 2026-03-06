// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import pages when ready
 import Home from './pages/Home';
import Servicessection from './pages/Servicessection';
 import About from './pages/AboutPage';
 import Contactsection from './pages/Contactsection'

function App() {
  return (
    <Router>
      {/* Dubai-style Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* Define your routes here */}
         <Route path="/" element={<Home />} />
       <Route path="/services" element={<Servicessection />} /> 
        <Route path="/about" element={<About />} /> 
      <Route path="/contact" element={<Contactsection />} /> 

       
      </Routes>
    </Router>
  );
}

export default App;