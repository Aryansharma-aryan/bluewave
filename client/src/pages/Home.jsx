// src/pages/Home.jsx
import React from 'react';
import HeroSection from '../components/home/HeroSection'; // import HeroSection
import ServicesSection from './Servicessection';

import Contactsection from "./Contactsection";
// import AboutPage from './AboutPage';
import CountriesSection from './Countriessection';

import Faq from "./Faq"
import AboutPage from './AboutPage';




export default function Home() {
  return (
    <div>
      <HeroSection /> {/* Hero Section displayed here */}
             <AboutPage/> 
        <ServicesSection/>
      <CountriesSection/>
      <Faq/>
      

          

      <Contactsection/>
    </div>
  );
}