// src/pages/Home.jsx
import React from 'react';
import HeroSection from '../components/home/HeroSection'; // import HeroSection
import ServicesSection from './Servicessection';
import Contactsection from "./Contactsection";
import WhyChooseUs from "./WhyChooseUs"


export default function Home() {
  return (
    <div>
      <HeroSection /> {/* Hero Section displayed here */}
      <ServicesSection/>
      <WhyChooseUs/>
          

      <Contactsection/>
    </div>
  );
}