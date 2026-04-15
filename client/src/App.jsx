import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Servicessection from './pages/Servicessection';
import About from './pages/AboutPage';
import Contactsection from './pages/Contactsection';
import Loader from './pages/Loader';
import ConsultancyForm from './components/Forms/ConsultancyForm';
import StudyVisa from './components/services/studyVisa';
import TouristVisa from './components/services/touristVisa';
import Pte from './components/services/pte';
import VisitorVisa from './components/services/visitorVisa';
import Footer from './components/Footer';






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
        <Route path="/study-visa" element={<StudyVisa />} />
        <Route path="/tourist" element={<TouristVisa />} />
        <Route path="/ielts-pte" element={<Pte />} />
        <Route path="/visitor-visa" element={<VisitorVisa />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;