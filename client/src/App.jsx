import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Servicessection from './pages/Servicessection';
import About from './pages/AboutPage';
import Contactsection from './pages/Contactsection';
import Loader from './pages/Loader';
import ConsultancyForm from './components/Forms/ConsultancyForm';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (hasVisited) {
      setIsLoading(false);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  // ✅ Let Loader decide when to finish
  if (isLoading) {
    return <Loader onDone={() => setIsLoading(false)} />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Servicessection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contactsection />} />
        <Route path="/consult" element={<ConsultancyForm />} />
      </Routes>
    </Router>
  );
}

export default App;